import express from 'express'
import { ProductManager } from './ProductManager.js'


const app = express()
const PORT = 4005
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager('./info.txt')

app.get('/products', async (req, res) => {
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


app.post("/product", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body
    await productManager.addProduct({ title, description, price, thumbnail, code, stock })
    res.send("Producto creado")
})

app.put("/product/:pid", async (req, res) => {
    const id = req.params.id
    const { title, description, price, thumbnail, code, stock } = req.body

    const mensaje = await productManager.updateProduct(id, { title, description, price, thumbnail, code, stock })

    res.send(mensaje)
})

app.delete("/product/:id", async (req, res) => {
    const id = req.params.id
    const mensaje = await productManager.deleteProduct(id)
    res.send(mensaje)
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
