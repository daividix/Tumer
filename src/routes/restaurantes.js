const router = require('express').Router()
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

var upload = multer({
    storage: storage
})
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'daividix',
    api_key: '311686583283326',
    api_secret: 'yAkWPDF_wV4chDnzaKbS2r1b4NU'
})

const Restaurante = require('../schemas/restaurantes').Restaurante
const Imagen = require("../schemas/imagenes").Imagen


router.get('/restaurantes/:page', (req, res, next) => {
    let perpage = 2
    let page = parseInt(req.params.page) || 1

    Restaurante.find({})
        .skip((perpage * page) - perpage)
        .limit(perpage)
        .exec((err, restaurantes) => {
            if (err) {
                return res.json({
                    status: false,
                    message: 'Ocurrio un error en la base de datos',
                    error: err
                })
            }
            Restaurante.count((err, count) => {
                if (err){
                    return res.json({
                        status: false,
                        message: "Hubo un error al encontrar los restaurantes"
                    })
                };
                let pages = Math.ceil(count/perpage)
                let nextPage = page<pages ? Number(page+1) : null
                return res.json({
                    status: true,
                    restaurantes,
                    current: page,
                    pages,
                    nextPage
                })
            })
        })
});

router.get('/restaurantes-bestRank/:page', (req,res)=>{
    let perpage = 2
    let page = parseInt(req.params.page) || 1
    Restaurante.aggregate([
        {
            $match: {}
        },
        {
            $addFields: {
                totalAvg: {$avg: ["$calComi", "$calServ", "$calExp", "$calLimp","$calUbic"]}
            }
        },
        {
            $sort: {totalAvg: -1}
        }
    ])
    .skip((perpage * page) - perpage)
    .limit(perpage)
    .exec((err, restaurantes) => {
        if (err) {
            return res.json({
                status: false,
                message: 'Ocurrio un error en la base de datos',
                error: err
            })
        }
        Restaurante.count((err, count) => {
            if (err){
                return res.json({
                    status: false,
                    message: "Hubo un error al encontrar los restaurantes"
                })
            };
            let pages = Math.ceil(count/perpage)
            let nextPage = page<pages ? Number(page+1) : null
            return res.json({
                status: true,
                restaurantes,
                current: page,
                pages,
                nextPage
            })
        })
    })
})

router.get('/restaurante-id/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
        Restaurante.findById(req.params.id, (err, restaurante) => {
            if (err) return next(err)
            return res.json({
                status: true,
                restaurante
            })
        })
    } else {
        return res.json({
            status: false,
            message: "Not authenticated"
        })
    }
})

router.get('/restaurantes-categoria/:tipo/:page', (req, res) => {
    let perpage = 2
    let page = req.params.page || 1
    Restaurante.find({
            tipo: req.params.tipo
        })
        .skip((perpage * page) - perpage)
        .limit(perpage)
        .exec((err, restaurantes) => {
            if (err) {
                return res.json({
                    status: false,
                    message: 'Hubo un error al consultar la base de datos',
                    error: err
                })
            }
            Restaurante.count({tipo: req.params.tipo},(err, count) => {
                if (err){
                    return res.json({
                        status: false,
                        message: "Ocurrio un error en la consulta",
                        error: err
                    })
                }
                let pages = Math.ceil(count/perpage)
                let nextPage = page<pages ? page+1 : null
                return res.json({
                    status: true,
                    restaurantes,
                    current: page,
                    pages,
                    nextPage
                })
            })
        })
});

router.get('/restaurante-nombre/:nombre/:page',(req,res)=>{
    let perpage = 2
    let page = req.params.page || 1
    Restaurante.find({
        name: req.params.nombre
    })
    .skip((perpage*page)-perpage)
    .limit(perpage)
    .exec((err,restaurantes)=>{
        if (err){
            return res.json({
                status: false,
                message: 'Hubo un error al consultar la base de datos',
                error: err
            })
        }
        Restaurante.count({name: req.params.nombre},(err,count)=>{
            if (err) {
                return res.json({
                    status: false,
                    message: 'Ocurrio un error en la base de datos',
                    error: err
                })
            }
            let pages = Math.ceil(count/perpage)
            let nextPage = page<pages ? page+1 : null
            return res.json({
                status: true,
                restaurantes,
                currentPage: page,
                pages,
                nextPage
            })
        })
    })
})

router.post('/restaurante', upload.single('image'), (req, res, next) => {
    if (req.isAuthenticated() && req.user.type == 1) {
        const restaurante = new Restaurante(req.body)
        if (!restaurante.name) {
            return res.status(400).json({
                status: false,
                message: "Falta el nombre"
            })
        }
        if (!restaurante.direccion) {
            return res.status(400).json({
                status: false,
                message: "Falta la direccion"
            })
        }
        if (!restaurante.telefono) {
            return res.status(400).json({
                status: false,
                message: "Falta el telefono"
            })
        }
        if (!restaurante.eslogan) {
            return res.status(400).json({
                status: false,
                message: "Falta el eslogan"
            });
        }
        if (!restaurante.informacion) {
            return res.status(400).json({
                status: false,
                message: "Falta la informacion"
            })
        }
        cloudinary.uploader.upload(req.file.path, function (result) {
            restaurante.save((err, restaurante) => {
                if (err) {
                    return res.json({
                        status: false,
                        message: "Hubo un error al almacenar el sitio en la base de datos",
                        erro: err
                    })
                }
                fs.unlinkSync(req.file.path)
                const imagen = new Imagen({
                    name: req.file.originalname,
                    owner: restaurante._id,
                    url: result.secure_url
                })
                imagen.save((err, image) => {
                    if (err) {
                        return res.json({
                            status: false,
                            message: "Hubo un error al almacenar la imagen en la base de datos",
                            error: err
                        })
                    }
                    return res.json({
                        status: true,
                        restaurante,
                        image
                    })
                })

            })
        })
    } else {
        return res.json({
            status: false,
            message: "Solo administradores, debe estar autenticado"
        })
    }

})

router.post('/search-restaurante/:page', (req,res)=>{
    let perpage = 2
    let page = parseInt(req.params.page) || 1
    Restaurante.find({
        name: {$regex: new RegExp(req.body.value, 'gi')}
    })
    .skip((perpage*page)-perpage)
    .limit(perpage)
    .exec((err,restaurantes)=>{
        if (err) {
            return res.json({
                status: false,
                message: 'Ocurrio un error en la base de datos',
                error: err
            })
        }
        Restaurante.count({name: {$regex: new RegExp(req.body.value, 'gi')}},(err,count)=>{
            if (err) {
                return res.json({
                    status: false,
                    message: 'Ocurrio un error en la base de datos',
                    error: err
                })
            }
            let pages = Math.ceil(count/perpage)
            let nextPage = page<pages ? page+1 : null
            return res.json({
                status: true,
                restaurantes,
                currentPage: page,
                pages,
                nextPage
            })
        })
        
    })
})

router.delete('/restaurante/:id', (req, res, next) => {
    if (req.isAuthenticated() && req.user.type == 1) {
        Restaurante.remove({
            _id: req.params.id
        }, (err, result) => {
            if (err) {
                return res.json({
                    status: false,
                    message: "Ocurrio un error en la base de datos",
                    error: err
                })
            }
            return res.json({
                status: true,
                result
            })
        })
    } else {
        return res.json({
            status: false,
            message: "Solo administradores, debe estar autenticado"
        })
    }

})

router.put('/restaurante/:id', (req, res, next) => {
    if (req.isAuthenticated() && req.user.type == 1) {
        if (!req.body) {
            return res.json({
                status: false,
                message: "Peticion mal hecha"
            })
        }
        const updateRestaurante = req.body
        if (!updateRestaurante.name) {
            return res.status(400).json({
                status: false,
                message: "Falta el nombre"
            })
        }
        if (!updateRestaurante.direccion) {
            return res.status(400).json({
                status: false,
                message: "Falta la direccion"
            })
        }
        if (!updateRestaurante.telefono) {
            return res.status(400).json({
                status: false,
                message: "Falta el telefono"
            })
        }
        if (!updateRestaurante.eslogan) {
            return res.status(400).json({
                status: false,
                message: "Falta el eslogan"
            })
        }
        if (!updateRestaurante.informacion) {
            return res.status(400).json({
                status: false,
                message: "Falta la informacion"
            })
        } else {
            Restaurante.findByIdAndUpdate(req.params.id, updateRestaurante, (err, result) => {
                if (err){
                    return res.json({
                        status: false,
                        message: "Hubo un error al almacenar el dato",
                        error: err
                    })
                }
                return res.json({
                    status: true,
                    message: "Se ha actualizado el restaurante correctamente",
                    restaurante: result
                })
            })
        }
    }else{
        return res.json({
            status: false,
            message: "Solo administradores, debe estar autenticado"
        })
    }

})
module.exports = router;