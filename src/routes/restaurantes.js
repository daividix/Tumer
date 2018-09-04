const router = require('express').Router()
const mongoose = require('mongoose')
const multer = require('multer');
const fs = require('fs')
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
const Imagen = require("../schemas/imagenes").Imagen
mongoose.connect('mongodb://localhost/tumer')

router.get('/restaurantes/:page', (req,res,next) =>{
    let perpage = 9
    let page = req.params.page || 1

    Restaurante.find({})
    .skip((perpage * page ) - perpage)
    .limit(perpage)
    .exec((err, restaurantes) =>{
        Restaurante.count((err, count) =>{
        if (err) return next(err);
            res.json({
                restaurantes,
                current: page,
                pages: Math.ceil(count / perpage)
            })
        })
    })
});

router.get('/restaurante-id/:id', (req,res,next) =>{
    Restaurante.findById(req.params.id,(err,restaurante) =>{
        if (err) return next(err);
        res.json(restaurante);
    });
});

router.get('/restaurantes-nombre/:nombre/:page', (req,res,next)=> {
    let perpage = 9
    let page = req.params.page || 1
    Restaurante.find({name: req.params.nombre}, (err,restaurantes)=>{
        if (err) return next(err);
    })
    .skip((perpage * page) - perpage)
    .limit(perpage)
    .exec((err,restaurantes)=>{
        Restaurante.count((err, count) =>{
            if (err) return next(err);
            res.json({
                restaurantes,
                current: page,
                pages: Math.ceil(count / perpage)
            })
        })
    })
});

router.get('/restaurantes-categoria/:tipo/:page', (req,res,next)=> {
    let perpage = 9
    let page = req.params.page || 1
    Restaurante.find({tipo: req.params.tipo}, (err)=>{
        if (err) return next(err);
    })
    .skip((perpage * page) - perpage)
    .limit(perpage)
    .exec((err,restaurantes)=>{
        Restaurante.count((err, count) =>{
            if (err) return next(err);
            res.json({
                restaurantes,
                current: page,
                pages: Math.ceil(count / perpage)
            })
        })
    })
});


router.post('/restaurante', upload.single('image'), (req,res,next) =>{
    const restaurante = new Restaurante(req.body)
    if (!restaurante.name) {
        return res.status(400).json({
            error: "faltan datos requeridos"
        });
    }
    if (!restaurante.direccion) {
        return res.status(400).json({
            error: "faltan datos requeridos"
        });
    }
    if (!restaurante.telefono) {
        return res.status(400).json({
            error: "faltan datos requeridos"
        });
    }
    if (!restaurante.eslogan) {
        return res.status(400).json({
            error: "faltan datos requeridos"
        });
    }
    if (!restaurante.informacion) {
        return res.status(400).json({
            error: "faltan datos requeridos"
        });
    }
    cloudinary.uploader.upload(req.file.path, function(result) {
        restaurante.save((err,restaurante)=>{
            if (err) return next(err);
            fs.unlinkSync(req.file.path)
            const imagen = new Imagen({
                name: req.file.originalname,
                owner: restaurante._id,
                url: result.secure_url
            })
            imagen.save((err,image)=>{
                if (err) return next(err)
                res.json([restaurante,image])  
            })
             
        })
      });
})
    
router.delete('/restaurante/:id', (req,res,next) =>{
    Restaurante.remove({_id: req.params.id}, (err,result)=>{
        if (err) return next(err);
        res.json(result)
    });
});

router.put('/restaurante/:id', (req,res,next) =>{
    const updateRestaurante = req.body

    if (!updateRestaurante.name) {
        res.status(400).json({
            error: "faltan datos requeridos"
        });
    }
    if (!updateRestaurante.direccion) {
        res.status(400).json({
            error: "faltan datos requeridos"
        });
    }
    if (!updateRestaurante.telefono) {
        res.status(400).json({
            error: "faltan datos requeridos"
        });
    }
    if (!updateRestaurante.eslogan) {
        res.status(400).json({
            error: "faltan datos requeridos"
        });
    }
    if (!updateRestaurante.informacion) {
        res.status(400).json({
            error: "faltan datos requeridos"
        });
    }
    /*if (!updateRestaurante.calExp &&
        !updateRestaurante.calLimp &&
        !updateRestaurante.calServ &&
        !updateRestaurante.calcomi) {
        res.status(400).json({
            error: 'Faltan calificaciones'
        })
    }*/else{
        Restaurante.findByIdAndUpdate(req.params.id, updateRestaurante, (err,result) =>{
            if (err) return next(err);
            res.json(result);
        });
    }
});
module.exports = router;