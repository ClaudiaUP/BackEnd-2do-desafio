import {promises as fs} from "fs"

class ProductManager{
    constructor(){
        this.path="./products.txt"
        this.products=[]
    }

    static id=0

    addProduct=async(titulo, descripcion,precio, imagen, codigo, stock)=>{

        ProductManager.id++
    //creo un nuevo producto
        let newProduct = {
            titulo,
            descripcion,
            precio,
            imagen,
            codigo,
            stock,
            id:ProductManager.id
        }

        console.log (newProduct)

        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products));
    };

   readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8")
        return (JSON.parse(respuesta))  
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) =>{
         let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id ===id)){   
        console.log("Producto no encontrado")
    } else {
        console.log (respuesta3.find(product => product.id ===id))
    }

    
    };

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Producto Eliminado")
    };

    updateProducts = async ({ id, ...producto}) => {
        await this.deleteProductsById(id);
        let productAnte = await this.readProducts();
        let productNuevo =[{ ...producto, id}, ...productAnte];
      await fs.writeFile(this.path, JSON.stringify (productNuevo));
      
    };
     } 



const productos = new ProductManager
//Agrego los productos.
productos.addProduct("Heladera", "Con freezer no frost", 350000, "imagen1", "vcx1", 28)
productos.addProduct("Lavarropas", "Vertical", 250000, "imagen2", "vcx2", 40)
productos.addProduct("Cocina", "Con 4 hornallas y timer", 190000, "imagen3", "vcz8", 40)

//productos.getProducts()


//Recibe un id y tras leer el archivo busca el producto con ese id
//productos.getProductsById(3)

//Borro un producto con un id determinado
//productos.deleteProductsById(3)

//productos.updateProductos({
   // titulo: 'Lavarropas',
   // descripcion: 'Vertical',
   // precio: 400000,
   // imagen: 'imagen2',
    //codigo: 'vcx2',
   // stock: 40,
   // id: 2
//})