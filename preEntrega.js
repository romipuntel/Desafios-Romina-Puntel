
class Producto {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = null;
    }
}

class ProductManager {
    constructor() {
        this.productos = [];
        this.lastId = 0;
    }

    addProduct(producto) {
        // Validación de campos obligatorios
        if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
            console.error("Todos los campos son obligatorios")
            return
        }

        // Validación de código único
        if (this.productos.some((p) => p.code === producto.code)) {
            console.error("El código ya está en uso")
            return
        }

        // Agregar producto al arreglo
        this.lastId++;
        this.productos.push({
            id: this.lastId,
            ...producto,
        });
        console.log("Producto agregado correctamente");
    }

    getProducts() {
        return this.productos;
    }

    getProductById(id) {
        const producto = this.productos.find((producto) => producto.id === id);
        if (!producto) {
            console.error(`Not found: producto con id ${id}`);
        } else {
            console.log(`Producto`);
        }
        return producto
    }

}

const productManager = new ProductManager()

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


