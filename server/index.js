const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const cors = require('cors');

dotenv.config();
const connectDB = require('./config/DB');

const userRoute = require('./route/userRoute');
const novelRoute = require('./route/novelRoute');
const chapterRoute = require('./route/chapterRoute');

connectDB();

const app = express();

// Development logging with Morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'server is running',
  });
});

// Middleware
app.use(express.json());
app.use(cookieParser());

// Cors

app.use(
  cors({
    origin: '*',
  })
);

// Routes
app.use('/api/user', userRoute);
app.use('/api/novel', novelRoute);
app.use('/api/chapter', chapterRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `${colors.yellow('Server is running in')} ${colors.blue.bold(
      process.env.NODE_ENV
    )} ${colors.yellow('mode on port')} ${colors.red.bold(PORT)}`
  );
});
