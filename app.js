const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')

const config = require('./src/config/config')

mongoose.connect(config.database)
mongoose.Promise = global.Promise

app.set('tokenSecret', config.secret)

//routes
const usuariosRoutes = require('./src/routes/usuarios')
const restaurantesRoutes = require('./src/routes/restaurantes')
const comentariosRoutes = require('./src/routes/comentarios')
const calificacionesRoutes = require('./src/routes/calificaciones')
const imagenesRoutes = require('./src/routes//imagenes')
const reaccionesRoutes = require('./src/routes/reacciones')


//settings
app.set('views', path.join(__dirname,'/src/views'))
app.set('port', process.env.PORT || 3000)
app.engine('html',require('ejs').renderFile)
//app.use(express.static(path.join(__dirname, '/src/views/dist/client')))

//middlewares
//app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({
    secret: 'daividix',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

require('./src/config/passport')(passport)

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
app.use('/api',reaccionesRoutes)

//start server
app.listen(app.get('port'), ()=>{
    console.log('server on port ',app.get('port'))
})