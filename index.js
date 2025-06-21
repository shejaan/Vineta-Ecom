const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
<<<<<<< HEAD
=======
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth');
>>>>>>> ce6979e (SignUp changes)

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

<<<<<<< HEAD
=======
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'vineta-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/myEcommerceDB' }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

app.use(authRoutes);

>>>>>>> ce6979e (SignUp changes)
app.get('/', (req,res)=>{
    res.render('index.ejs');
});

app.get('/shop-sub-collection', (req,res)=>{
    res.render('shop-sub-collection.ejs')
})

<<<<<<< HEAD
=======
mongoose.connect('mongodb://localhost:27017/myEcommerceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB: myEcommerceDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

>>>>>>> ce6979e (SignUp changes)
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});