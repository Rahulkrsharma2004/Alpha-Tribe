const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser())
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

app.get('/', (req, res) => res.send('API running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
