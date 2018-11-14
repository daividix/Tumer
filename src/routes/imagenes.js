const router = require('express').Router()
const Imagen = require('../schemas/imagenes').Imagen
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

router.get('/imagenes-restaurante/:id', (req,res,next)=>{
    Imagen.find({owner: req.params.id}, (err, imagenes)=>{
        if (err){
            return res.json({
                status: false,
                message: "Hubo un error al buscar"
            })
        }else{
            return res.json({
                status: true,
                imagenes
            })
        }
        res.json(imagenes);
    })
});

router.post('/imagen', upload.single('image'), (req, res, next)=>{
    if (req.isAuthenticated() && req.user.type == 1) {
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
                    status: false,
                    message: "Faltan datos requeridos"
                })
            }
            imagen.save((err,imagen)=>{
                if (err){
                    return res.json({
                        status: false,
                        message: "Hubo un error al guardar los datos de la imagen",
                        error: err
                    })
                }
                fs.unlinkSync(req.file.path)
                return res.json({
                    status: true,
                    message: "Se ha guardado la imagen correctamente",
                    imagen
                })
            })
        })
    }else{
        return res.json({
            status: false,
            message: "Solo administradores, debe estar autenticado"
        })
    }
    
})

router.delete('/imagen/:id', (req,res,next)=>{
    if (req.isAuthenticated() && req.user.type == 1) {
        Imagen.remove({_id: req.params.id}, (err,result)=>{
            if (err) {
                return res.json({
                    status: false,
                    message: "hubo un error al eliminar la imagen",
                    error: err
                })
            }
            return res.json({
                status: true,
                message: "Se ha eliminado la imagen correctamente"
            })
        })
    }else{
        return res.json({
            status: false,
            message: "Solo administradores, debe estar autenticado"
        })
    }
})


module.exports = router