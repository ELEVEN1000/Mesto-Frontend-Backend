require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const errors = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb15', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(require('./routes/index'));

app.use(errorLogger);

app.use(errors);

app.listen(PORT, () => {
});
