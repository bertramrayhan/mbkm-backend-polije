const express = require('express');
const db = require('./config/database');
const app = express();
const port = 3000;

app.get('/test-db', async (req, res) => {
    try {
        const [results, fields] = await db.query('SELECT 1');
        res.status(200).json({
            message: 'Koneksi database berhasil!',
            result: results[0]
        });
    } catch (error) {
        console.error(error);
    }

});

app.get('/', (req, res) => {
  res.send('Server API saya sudah jalan!');
});

app.listen(port, () => {
  console.log(`Server mendengarkan di http://localhost:${port}` );
});
