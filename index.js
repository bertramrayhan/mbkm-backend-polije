require('dotenv').config(); // Load environment variables first
const express = require('express');
const app = express();
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/events', eventRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server mendengarkan di http://localhost:${port}` );
});
