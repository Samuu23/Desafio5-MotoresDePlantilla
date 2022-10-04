const express = require('express')
const {Router} = require('express')
const pug = require('pug')

const app= express()
const router= Router()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/", express.static("public"));

app.set('views', './views')
app.set('view engine', 'pug')

const products=[]

//Rutas

router.get('/', (req, res)=>{
    res.render('index')
})

router.get('/productos', (req, res)=>{
    res.render('main', {products})
})

router.post('/productos', (req, res)=>{
    if(!products.length){
        req.body.id = 1
        products.push(req.body)
        res.redirect('/productos')
        console.log('productos cargados')
        res.json({products})
    }else{
        const id = products.lenght + 1
        req.body.id = id
        products.push(req.body)
        res.redirect('/productos')
        console.log('productos cargados v2')
        res.json({products})
    }
})

//App

app.use('/', router)

app.listen(8080, ()=>{
    console.log('se esta escuchando en el puerto 8080')
})