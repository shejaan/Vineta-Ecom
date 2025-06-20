const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res)=>{
    res.render('index.ejs');
});

app.get('/shop-sub-collection', (req,res)=>{
    res.render('shop-sub-collection.ejs')
})

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});