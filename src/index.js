import express from 'express'
import { ProductManager } from './ProductManager.js'

const productManager = new ProductManager('./info.txt')

const app = express()
const PORT = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/products', async (req, res) => {
    const limit = req.query.limit
    if (limit) {
        products = products.slice(0, limit)
    }

    res.send(JSON.stringify(products))
})


app.get("/product/:id", async (req, res) => {
    const product = await productManager.getProductById(req.params.id)
    res.send(product)
})


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
