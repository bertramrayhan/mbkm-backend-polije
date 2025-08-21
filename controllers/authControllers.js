const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {checkFields, trimFields} = require('../helper');

async function register(req, res){
    try {
        const {name, email, password, role} = req.body;
        if(!checkFields([name, email, password, role])){
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
        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(409).json({
                error: 'Email sudah terdaftar'
            })
        }

        res.status(500).json({error: error});
    }
};

async function login(req, res){
    try {
        trimFields(req.body);
        const {email, password} = req.body;
        if(!checkFields([email, password])){
            return res.status(400).json({
                success: false,
                message: 'Semua field wajib diisi'
            });
        }

        const query = "SELECT * FROM users WHERE email=?";
        const [user] = await db.query(query, [email]);

        if(user.length === 0){
            return res.status(404).json({
                success: false,
                message: 'User tidak ditemukan'});
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
                success: true,
                message: 'Login berhasil',
                token: token
            })
        }else {
            return res.status(401).json({
                success: false,
                message: 'Password salah'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error}
        );
    }
};

async function logout(req, res){
    res.status(200).json({
        success: true,
        message: 'Logout berhasil'
    })
};

async function getProfile(req, res){
    try {
        const userId = req.user.id;
        const query = 'SELECT name, email, role FROM users WHERE id=?';
        const [user] = await db.query(query, [userId]);

        res.status(200).json({
            success: true,
            message: 'User berhasil ditemukan',
            data: user[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error}
        );
    }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
};