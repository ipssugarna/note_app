const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Note = require('./models/note');
const notesRouter = require('./routes/notes');
const methodOverride = require('method-override');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const notes = await Note.find().sort('-createdAt');
  res.render('index', { notes: notes });
});

mongoose 
 .connect(process.env.MONGO_PROD_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.use('/', notesRouter);
app.listen(process.env.PORT || 4010, () => {
  console.log(`Server Has Started`);
});

