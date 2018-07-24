const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const usuariosRoutes = require('./src/routes/usuarios');
const restaurantesRoutes = require('./src/routes/restaurantes');
const comentariosRoutes = require('./src/routes/comentarios');


//settings
app.set('views', path.join(__dirname,'/src/views'))
app.set('port', process.env.PORT || 3000)
app.engine('html',require('ejs').renderFile)

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routes
app.get('/',(req,res)=>{
    res.render('index.html')
})
app.use('/api',usuariosRoutes)
app.use('/api',restaurantesRoutes)
app.use('/api',comentariosRoutes)

//start server
app.listen(app.get('port'), ()=>{
    console.log('server on port ',app.get('port'))
})