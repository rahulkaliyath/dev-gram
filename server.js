const express = require('express');
const app =express();
const cors = require('cors');
const connectDB = require('./config/mongo');
const path = require('path');

const PORT = process.env.PORT || 5000


connectDB();
app.use(cors());
app.use(express.json({ extended :false}));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));


if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname,'client/build')));

    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname,'client/build','index.html'))
    }); 
}


app.listen(PORT, () => {
    console.log(`Sever started on PORT ${PORT}`);
});
