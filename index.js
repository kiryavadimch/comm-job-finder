require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const page = (req,res) => {
  const page = req.query.page
  const limit = req.query.limit
  
  const startIndex = (page-1)* limit
  const endIndex = page * limit
  
  const results = {}
  
  results.next = {
    page: page +1 ,
    limit: limit
  }
  results.previous = {
    page: page - 1, 
    limit: limit 
  }
}

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
const sportVacancyRouter = require('./routers/sportvacancy');
const profileRouter = require('./routers/profile');

app.use('/auth', authRouter);
app.use('/articles', articleRouter)
app.use('/vacancy', vacancyRouter) 
app.use('/profile',profileRouter)      

app.use('/sportVacancy', sportVacancyRouter);
app.use('/help', helpRouter)
app.use('/files', filesRouter)

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
