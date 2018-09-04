const router = require('express').Router()
const mongoose = require('mongoose')
const Imagen = require('../schemas/imagenes').Imagen
const multer = require('multer');
const fs = require('fs')
mongoose.connect('mongodb://localhost/tumer')

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

router.get('/imagenes-restaurante/:id', (req,res,next)=>{
    Imagen.find({owner: req.params.id}, (err, imagenes)=>{
        if (err) return next(err);
        res.json(imagenes);
    })
});

router.post('/imagen', upload.single('image'), (req, res, next)=>{
    
    cloudinary.uploader.upload(req.file.path, (result) =>{
        const imagen = new Imagen({
            name: req.file.originalname,
            owner: req.body.owner,
            url: result.secure_url
        })
        if (!imagen.name &&
            !imagen.owner &&
            !imagen.url){
                
            return res.status(400).json({
                error: "Faltan datos necesarios"
            })
        }
        imagen.save((err,imagen)=>{
            if (err) return next(err);
            fs.unlinkSync(req.file.path)
            res.json(imagen)
        })
    })
})

router.delete('/imagen/:id', (req,res,next)=>{
    Imagen.remove({_id: req.params.id}, (err,result)=>{
        if (err) return next(err);
        res.json(result)
    })
});


module.exports = router