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
            const data = this.productos.map((productos) => JSON.stringify(productos))
            await fs.writeFile(this.path, JSON.stringify(this.productos, null, 2), "utf-8")
        } catch (err) {
            console.error(err)
        }
    }

    async addProduct(producto) {
        const prodsJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        producto.id = ProductManager.incrementarID()
        prods.push(producto)
        await fs.writeFile(this.path, JSON.stringify(prods))
        return "Producto creado"
    }


    async getProducts() {
        const product = await fs.readFile(this.path, 'utf-8')
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
        const prodsJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        if (prods.some(prod => prod.id === parseInt(id))) {
            const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id))
            await this.saveProductsToFile(prodsFiltrados)
            return "Producto eliminado"
        } else {
            return "Producto no encontrado"
        }
    }

}



//const producto1 = new Producto("El enemigo Malbec", "vino malbec", "3000", "img/enemigo", "23234", "45")
//productManager.addProduct(producto1)
//const producto2 = new Producto("Alamos", "vino malbec", "1500", "img/alamos", "16346", "10")
//productManager.addProduct(producto2)
//const producto3 = new Producto("Adriana Zapata", "vino blanco", "3400", "img/zapata", "12674", "30")
//productManager.addProduct(producto3)
//const producto4 = new Producto("Luca", "vino malbec", "4500", "img/luca", "32474", "25")
//productManager.addProduct(producto4)
//const producto5 = new Producto("Sur de los andes", "vino Pinot Noir", "1400", "img/sur", "53694", "30")
//productManager.addProduct(producto5)


