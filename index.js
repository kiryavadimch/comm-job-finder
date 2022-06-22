require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

const URI = process.env.URL;
const PORT = process.env.PORT;

const authRouter = require('./routers/auth');
const articleRouter = require('./routers/article');
const vacancyRouter = require('./routers/vacancy');
const helpRouter = require('./routers/help')
const filesRouter = require('./routers/files')
const profile = require('./routers/profile')

app.use('/auth', authRouter);
app.use('/articles', articleRouter);
app.use('/vacancy', vacancyRouter);
app.use('/help', helpRouter)
app.use('/files', filesRouter)
app.use('/profile', profile)

const start = async () => {
  try {
    await mongoose.connect(
      URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      console.log('Connected to MongoDB')
    );
    app.listen(PORT, () => {
      console.log('Server started on port ', PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
