const db = require('../config/database');

async function createEvent(req, res){
    try {
        const {id} = req.body;
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

async function getAllEvents(req, res){
    res.status(200).json({ message: "Endpoint untuk mengambil semua event"});
};

async function getEventById(req, res){
    const id = req.params.id;
    res.status(200).json({ message: `Endpoint untuk mengambil event dengan ID: ${id}`});
};

async function updateEvent(req, res){
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

async function deleteEvent(req, res){
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

async function testDB(req, res){
    try {
        const [results, fields] = await db.query('SELECT 1');
        res.status(200).json({
            message: 'Koneksi database berhasil!',
            result: results[0]
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  testDB,
  updateEvent,
  deleteEvent,
};
