const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    res.render('home-electronic.ejs');
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});