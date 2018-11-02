const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')

const config = require('./src/config/config')

mongoose.connect(config.database)
mongoose.Promise = global.Promise

app.set('tokenSecret', config.secret)

//routes
const usuariosRoutes = require('./src/routes/usuarios');
const restaurantesRoutes = require('./src/routes/restaurantes');
const comentariosRoutes = require('./src/routes/comentarios');
const calificacionesRoutes = require('./src/routes/calificaciones');
const imagenesRoutes = require('./src/routes//imagenes');


//settings
app.set('views', path.join(__dirname,'/src/views'))
app.set('port', process.env.PORT || 3000)
app.engine('html',require('ejs').renderFile)

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routes
app.get('/',(req,res)=>{
    res.render('index.html')
})
app.get('/uploadimagen',(req,res)=>{
    res.render('imagen.html')
})
app.use('/api',usuariosRoutes)
app.use('/api',restaurantesRoutes)
app.use('/api',comentariosRoutes)
app.use('/api',calificacionesRoutes)
app.use('/api',imagenesRoutes)

//start server
app.listen(app.get('port'), ()=>{
    console.log('server on port ',app.get('port'))
})