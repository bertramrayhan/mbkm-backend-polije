const db = require('../config/database');
const {checkFields, compareDate, trimFields} = require('../helper');

async function createEvent(req, res){
    try {
        trimFields(req.body);
        const {title, description, venue, start_datetime, end_datetime} = req.body;
        if(!checkFields([title, description, venue, start_datetime, end_datetime])){
            return res.status(400).json({error: 'Semua field wajib diisi'});
        }

        const resultCompareDate = compareDate(start_datetime, end_datetime);
        if(!resultCompareDate.success){
            return res.status(400).json(resultCompareDate);
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
                message: 'Event gagal dibuat'
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        });
        console.log(error);
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
        const eventId = req.params.id;
        const query = 'SELECT * FROM events WHERE id=?';
        const [event] = await db.query(query, [eventId]);

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
        const eventId = req.params.id;
        const query = 'SELECT organizer_id FROM events WHERE id=?';
        const [event] = await db.query(query, [eventId]);

        if(event.length > 0){
            const userId = req.user.id;
            const userRole = req.user.role;

            if(userId !== event[0].organizer_id && userRole !== 'admin'){
                return res.status(403).json({
                    success: false,
                    message: 'Akses ditolak. Anda tidak memiliki izin untuk mengubah event ini'
                })
            }

            trimFields(req.body);
            const {title, description, venue, start_datetime, end_datetime} = req.body;
            if(!checkFields([title, description, venue, start_datetime, end_datetime])){
                return res.status(400).json({error: 'Semua field wajib diisi'});
            }

            const resultCompareDate = compareDate(start_datetime, end_datetime);
            if(!resultCompareDate.success){
                return res.status(400).json(resultCompareDate);
            }

            const queryUpdate = 'UPDATE events SET title=?, description=?, venue=?, start_datetime=?, end_datetime=? WHERE id=?';
            const [result] = await db.query(queryUpdate, [title, description, venue, start_datetime, end_datetime, eventId]);

            if(result.affectedRows > 0){
                res.status(200).json({
                    success: true,
                    message: 'Event berhasil diperbarui'
                });
            }else {
                res.status(400).json({
                    success: false,
                    message: 'Event gagal diperbarui atau tidak ada field yang diperbarui'
                });
            }

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

async function deleteEvent(req, res){
    try {
        const eventId = req.params.id;
        const query = 'SELECT organizer_id FROM events WHERE id=?';
        const [event] = await db.query(query, [eventId]);

        if(event.length > 0){
            const userId = req.user.id;
            const userRole = req.user.role;

            if(userId !== event[0].organizer_id && userRole !== 'admin'){
                return res.status(403).json({
                    success: false,
                    message: 'Akses ditolak. Anda tidak memiliki izin untuk menghapus event ini'
                })
            }

            const queryDelete = 'DELETE FROM events WHERE id=?';
            const [result] = await db.query(queryDelete, [eventId]);

            if(result.affectedRows > 0){
                res.status(200).json({
                    success: true,
                    message: 'Event berhasil dihapus'
                });
            }else {
                res.status(400).json({
                    success: false,
                    message: 'Event gagal dihapus'
                });
            }

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

module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};
