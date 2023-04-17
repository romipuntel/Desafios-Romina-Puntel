import express from 'express'
import { ProductManager } from './ProductManager.js'


const app = express()
const PORT = 4000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager('./info.txt')

app.get('/productos', async (req, res) => {
    const productos = await productManager.getProducts()
    const limit = req.query.limit
    if (limit) {
        productos = productos.slice(0, limit)
    }

    res.send(JSON.stringify(productos))
})
 app.get('/products/:pid', (req, res) => {
    const productId = req.params.pid
    const productos = JSON.parse(fs.readFileSync('productos.json'))


    const producto = productos.find((p) => p.id === productId)

    if (!producto) {

        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto)
});


app.get("/product/:id", async (req, res) => {
    const producto = await productManager.getProductById(req.params.id)
    res.send(producto)
})


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
