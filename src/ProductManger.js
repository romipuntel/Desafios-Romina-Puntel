import { promises as fs } from 'fs'


export class ProductManager {
    constructor(path) {
        this.path = path
        this.productos = []
        this.readProductsFromFile()
    }

    static incrementarID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
    async readProductsFromFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            this.productos = data.trim().split('\n').map((line) => JSON.parse(line))
        } catch (err) {
            console.error(err)
            this.productos = []
        }
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
        const newProduct = { id, ...producto };
        this.productos.push(newProduct);
        await this.saveProductsToFile();
        return newProduct;
    }

    async getProducts() {
        await this.readProductsFromFile()
        return this.productos;
    }

    async getProductById(id) {
        await this.readProductsFromFile()
        return this.productos.find((producto) => producto.id === id)

    }

    async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
        const prodsJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        if (prods.some(prod => prod.id === parseInt(id))) {
            let index = prods.findIndex(prod => prod.id === parseInt(id))
            prods[index].title = title
            prods[index].description = description
            prods[index].price = price
            prods[index].thumbnail = thumbnail
            prods[index].code = code
            prods[index].stock = stock
            await fs.writeFile(this.path, JSON.stringify(prods))
            return "Producto actualizado"
        } else {
            return "Producto no encontrado"
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


productManager.getProducts().then((productos) => console.log(productos))
productManager.getProductById(1).then((producto) => console.log(producto))
productManager.updateProduct(1, { title: 'Producto Actualizado', price: 15 }).then((updatedProduct) => console.log(updatedProduct))
productManager.deleteProduct(2).then((result) => console.log(result))
productManager.getProducts().then((productos) => console.log(productos))