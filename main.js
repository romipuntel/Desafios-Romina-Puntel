import { promises as fs, readFile } from 'fs'
const RUTA_ARCHIVO = './info.txt'


const consultaTXT = async (ruta) => {
    await fs.writeFile(ruta, "")
    let contenido = await fs.readFile(ruta, 'utf-8')
    console.log(contenido)
    await fs.appendFile(ruta, "hola")
    contenido = await fs.readFile(ruta, 'utf-8')
    console.log(contenido)
    await fs.unlink(ruta)
}