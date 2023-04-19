import { promises as fs } from 'fs'

class Producto {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock

    }
}
export class ProductManager {
    constructor(path) {
        this.path = path
        this.productos = []
    }

    static incrementarID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }


    async saveProductsToFile() {
        try {
            const data = this.productos.map((productos) => JSON.stringify(productos)).join('\n')
            await fs.writeFile(this.path, data)
        } catch (err) {
            console.error(err)
        }
    }

    async addProduct(producto) {
        const id = this.productos.length > 0 ? this.productos[this.productos.length - 1].id + 1 : 1;
        const newProduct = { id, ...producto }
        this.productos.push(newProduct)
        await this.saveProductsToFile()
        return newProduct
    }


    async getProducts() {
        const prods = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(prods)
    }

    async getProductById(id) {
        const prodsJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        if (prods.some(prod => prod.id === parseInt(id))) {
            return prods.find(prod => prod.id === parseInt(id))
        } else {
            return "Producto no encontrado"
        }
    }

    async updateProduct(id, updateProduct) {
        const index = this.productos.findIndex((producto) => producto.id === id)
        if (index !== -1) {
            const update = { id, ...updateProduct }
            this.productos[index] = update
            await this.saveProductsToFile()
            return update
        } else {
            return "no encontrado"
        }
    }
    async deleteProduct(id) {
        const index = this.productos.findIndex((producto) => producto.id === id)
        if (index !== -1)
            this.productos.splice(index, 1)
        await this.saveProductsToFile()
        return true
    }
}


const productManager = new ProductManager('./info.txt')

const producto1 = new Producto("El enemigo Malbec", "vino malbec", "3000", "img/enemigo", "23234", "45")
productManager.addProduct(producto1)
const producto2 = new Producto("Alamos", "vino malbec", "1500", "img/alamos", "16346", "10")
productManager.addProduct(producto2)
const producto3 = new Producto("Adriana Zapata", "vino blanco", "3400", "img/zapata", "12674", "30")
productManager.addProduct(producto3)
const producto4 = new Producto("Luca", "vino malbec", "4500", "img/luca", "32474", "25")
productManager.addProduct(producto4)
const producto5 = new Producto("Sur de los andes", "vino Pinot Noir", "1400", "img/sur", "53694", "30")
productManager.addProduct(producto5)


//productManager.getProducts().then((productos) => console.log(productos))
//productManager.getProductById(1).then((producto) => console.log(producto))
//productManager.updateProduct(1, { title: 'Producto Actualizado', price: 15 }).then((updatedProduct) => console.log(updatedProduct))
//productManager.deleteProduct(2).then((result) => console.log(result))
//productManager.getProducts().then((productos) => console.log(productos))