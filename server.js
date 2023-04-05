const express = require('express');
const dotenv  = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize'); // prevent NoSQL injection
const helmet = require('helmet'); // prevent XSS attacks
const xss = require('xss-clean'); // prevent XSS attacks
const expressRateLimit = require('express-rate-limit'); // prevent brute force attacks
const hpp = require('hpp'); // prevent http param pollution

dotenv.config({path:'./config/config.env'});

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize()); // prevent NoSQL injection
app.use(helmet()); // prevent XSS attacks
app.use(xss()); // prevent XSS attacks

const limiter = expressRateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 1
});
app.use(limiter); // prevent brute force attacks

app.use(hpp()); // prevent http param pollution

const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');

app.use('/api/v1/hospitals', hospitals);
app.use('/api/v1/auth', auth);

const appointments = require('./routes/appointments');
app.use('/api/v1/appointments', appointments);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() =>process.exit());
});