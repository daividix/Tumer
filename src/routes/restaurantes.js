const router = require('express').Router()
const mongoose = require('mongoose')
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
var upload = multer({ storage: storage })
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'daividix',
    api_key: '311686583283326',
    api_secret: 'yAkWPDF_wV4chDnzaKbS2r1b4NU'
})
  
const Restaurante = require('../schemas/restaurantes').Restaurante
mongoose.connect('mongodb://localhost/tumer')

router.get('/restaurantes', (req,res,next) =>{
    Restaurante.find({},(err,restaurantes) =>{
        if (err) return next(err);
        res.json(restaurantes);
    });
});

router.get('/restaurantes/:id', (req,res,next) =>{
    Restaurante.findById(req.params.id,(err,restaurante) =>{
        if (err) return next(err);
        res.json(restaurante);
    });
});

router.post('/restaurantes', upload.single('image'), (req,res,next) =>{
    const restaurante = new Restaurante(req.body)
    cloudinary.uploader.upload(req.file.path, function(result) {
        restaurante.imagenes.push(result.secure_url)
        restaurante.save((err,restaurante)=>{
            if (err) return next(err);
            res.json(restaurante)    
        })
      });
    
    
})
router.delete('/restaurantes/:id', (req,res,next) =>{
    Restaurante.remove({_id: req.params.id}, (err,result)=>{
        if (err) return next(err);
        res.json(result)
    });
});

router.put('/restaurantes/:id', (req,res,next) =>{
    const restaurante = req.body
    const updateRestaurante = {}

    if (restaurante.name) {
        updateRestaurante.name = restaurante.name;
    }
    if (restaurante.direccion) {
        updateRestaurante.direccion = restaurante.direccion;
    }
    if (restaurante.telefono) {
        updateRestaurante.telefono = restaurante.telefono;
    }
    if (restaurante.eslogan) {
        updateRestaurante.eslogan = restaurante.eslogan
    }
    if (restaurante.informacion) {
        updateRestaurante.informacion = restaurante.informacion
    }
    if (!updateRestaurante) {
        res.status(400).json({
            error: 'Bad request'
        })
    }else{
        Restaurante.findByIdAndUpdate(req.params.id, updateRestaurante, (err,result) =>{
            if (err) return next(err);
            res.json(updateRestaurante);
        });
    }
});
module.exports = router;