const express = require('express')

const app = express();
app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080');
})

let productos = []

class Producto {
    constructor (title, price, thumbnail) {
        this.id = productos.length+1
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}



productos.push(new Producto ("Computadora", 90000, "http://placehold.it/300x300"))
productos.push(new Producto ("Impresora", 65000, "http://placehold.it/300x300"))
productos.push(new Producto ("Teclado", 2000, "http://placehold.it/300x300"))

app.get("/api/productos/listar", (req, res) => {
    try{
        if(productos.length > 0){
            res.status(200).json(productos)
        }else {
            res.status(404).json({"error": "no hay productos cargados"})      
        }
    }catch(err) {
        res.status(404).json({err})
    }

})


app.get("/api/productos/listar/:id", (req, res) => {
    try{
        if (req.params.id <= (productos.length)) {
            res.status(200).json(productos[req.params.id-1])
        } else {
            res.status(404).json({"error": "producto no encontrado"})
        }
    }catch(err) {
        res.status(404).json({err})
    }
})

app.post("/api/productos/guardar/", (req, res) => {
   
    let title = req.query.title
    let thumbnail = req.query.thumbnail
    let price = parseInt(req.query.price)
  

    try{
            productos.push(new Producto(title, price, thumbnail))
            res.status(200).json(productos[productos.length -1])
        
    }catch(err) {
        res.status(404).json(err)
    }
})