const db = require('../config/database');
const bcrypt = require('bcrypt');

async function register(req, res){
    try {
        const {name, email, password, role} = req.body;

        res.status(201).json({ 
            message: "Event berhasil dibuat",
            data: {
                id
            }
        });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

async function login(req, res){
    res.status(200).json({ message: "Endpoint untuk mengambil semua event"});
};

async function getEventById(req, res){
    const id = req.params.id;
    res.status(200).json({ message: `Endpoint untuk mengambil event dengan ID: ${id}`});
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