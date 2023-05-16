import { Router } from "express";

import productManager from "../ProductManager.js";

const prodsRouter = Router();

//Instancio el objeto de productManager
const prodManager = new productManager();

prodsRouter.get('/', async (req, res)=>{

    try {

        let allProds = await prodManager.getProducts();

        let LimitProducts = req.query.limit;
        

            if (LimitProducts > 0 ) {

                     let ProdsFiltered = await allProds.slice(0, LimitProducts)

                     await res.send(ProdsFiltered)
                    
            }else{

                    await res.send(allProds)
            }
        
    } catch (error) {

        res.send(`El error es: ${error}`);
        
    }


})


//Filtro un producto por ID
prodsRouter.get('/:pid', async (req,res)=>{

    try {
            let allProds = await prodManager.getProducts();
            let filterId = await allProds.filter(prod => prod.id == req.params.pid)

            await res.send(filterId)
            
    } catch (error) {
            res.send(`El error es: ${error}`);
    }

            

})

    //Creando y añadiendo productos nuevos

prodsRouter.post('/', async(req, res)=>{


    try {

        //Añado productos
       await prodManager.addProduct("televisor", "Panaphonic", 223655, "thumnail",125544887, 12, true,"televisores");
       
        await prodManager.addProduct("televisor2", "Sorny", 552268, "thumnail",1255558742, 5, true,"televisores");
        
        await prodManager.addProduct("televisor3", "Sorny", 552268, "thumnail",125544887, 5, true,"televisores");
       
        
       //Envio respuesta si salio todo bien
       await res.status(201).send("Se agregó un nuevo producto")

        
    } catch (error) {

        res.status(500).send(error)
        
    }

    
})


prodsRouter.put('/:pid', async(req, res)=>{

try {
        const allProds = await prodManager.getProducts();
        const prodFilter = await allProds.filter(prod => prod.id == req.params.pid)
        res.send({"El producto a actualizar": prodFilter})   

            //guardo en newObject lo que recibo del body para actualizar
     let newObject = await req.body;

      await prodManager.updateProduct(req.params.pid, newObject);

    
} catch (error) {
    console.log(error);
}

})


prodsRouter.delete('/:pid', async(req, res)=>{

try {

        await prodManager.deleteProduct(req.params.pid);

        await res.status(200).send({"Producto de ID":req.params.pid+" eliminado"})
    
} catch (error) {

    res.status(404).send(error);
    
}


})

export {prodsRouter}