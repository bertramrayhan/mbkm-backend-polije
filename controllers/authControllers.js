const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req, res){
    try {
        const {name, email, password, role} = req.body;
        if(name === '' || email === '' || password === '' || role === ''){
            return res.status(400).json({error: 'Semua field wajib diisi'});
        }

        const encryptedPassword = await bcrypt.hash(password, 12);

        const query = "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)";
        const [result] = await db.query(query, [name, email, encryptedPassword, role])

        if(result.affectedRows > 0){
            res.status(201).json({ 
                message: "User berhasil didaftarkan",
                userId: result.insertId
            });
        }
    } catch (error) {
        console.error('Error registering user:', error);

        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(409).json({
                error: 'Email sudah terdaftar'
            })
        }

        res.status(500).json({error: error});
    }
};

async function login(req, res){
    const {email, password} = req.body;
    if(email === '' || password === ''){
        return res.status(400).json({error: 'Semua field wajib diisi'});
    }

    const query = "SELECT * FROM users WHERE email=?";
    const [user] = await db.query(query, [email]);

    if(user.length === 0){
        return res.status(404).json({error: 'User tidak ditemukan'});
    }

    const passwordFromDatabase = user[0].password;
    const resultComparison = await bcrypt.compare(password, passwordFromDatabase);
    if(resultComparison){
        const payload = {
            id: user[0].id,
            role: user[0].role
        }

        const options = {expiresIn: '24h'};

        const token = jwt.sign(payload, process.env.JWT_SECRET, options);

        res.status(200).json({
            message: 'Login berhasil',
            token: token
        })
    }else {
        return res.status(401).json({error: 'Password salah'});
    }
};

async function logout(req, res){
    try {
        const id = req.params.id;
        const {text} = req.body; 
        res.status(200).json({ 
            message: `Endpoint untuk memperbarui event dengan ID: ${id}`,
            text: text
        });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

async function getProfile(req, res){
    try {
        const id = req.params.id;
        const {text} = req.body; 
        res.status(200).json({ 
            message: `Endpoint untuk menghapus event dengan ID: ${id}`,
            text: text
        });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
};