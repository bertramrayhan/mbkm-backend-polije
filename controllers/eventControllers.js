const db = require('../config/database');
const {checkFields} = require('../helper');

async function createEvent(req, res){
    try {
        const {title, description, venue, start_datetime, end_datetime} = req.body;
        if(!checkFields([title, description, venue, start_datetime, end_datetime])){
            return res.status(400).json({error: 'Semua field wajib diisi'});
        }

        const organizer_id = req.user.id;
        const query = 'INSERT INTO events (title, description, venue, start_datetime, end_datetime, organizer_id) VALUES (?,?,?,?,?,?)';
        const [result] = await db.query(query, [title, description, venue, start_datetime, end_datetime, organizer_id]);

        if(result.affectedRows > 0){
            res.status(201).json({
                success: true,
                message: 'Event berhasil dibuat'
            });
        }else {
            res.status(400).json({
                success: false,
                message: 'Gagal membuat event'
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error}
        );
    }
};

async function getAllEvents(req, res){
    try {
        const query = "SELECT * FROM events ORDER BY id DESC";
        const [events] = await db.query(query);

        res.status(200).json({
            success: true,
            message: 'Semua event berhasil diberikan',
            data: events
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error}
        );
    }
};

async function getEventById(req, res){
    try {
        const id = req.params.id;
        const query = 'SELECT * FROM events WHERE id=?';
        const [event] = await db.query(query, [id]);

        if(event.length > 0){
            res.status(200).json({
                success: true,
                message: 'Event ditemukan',
                data: event[0]
            });
        }else {
            res.status(404).json({
                success: false,
                message: 'Event tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error}
        );
    }
};

async function updateEvent(req, res){
    try {
        const id = req.params.id;
        const {title, description, venue, start_datetime, end_datetime} = req.body;
        if(!checkFields([title, description, venue, start_datetime, end_datetime])){
            return res.status(400).json({error: 'Semua field wajib diisi'});
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error}
        );
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
        res.status(500).json({
            success: false,
            error: error}
        );
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
