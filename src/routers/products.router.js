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

    //Control de duplicados por CODE
    await securityFilter(125544887);
       
        await prodManager.addProduct("televisor2", "Sorny", 552268, "thumnail",1255558742, 5, true,"televisores");
            await securityFilter(1255558742);
        
        // await prodManager.addProduct("televisor4", "Sorny", 552268, "thumnail",125544, 5, true,"televisores");

        // //Control de duplicados por CODE
        // await securityFilter(125544);

        
    } catch (error) {

        res.status(500).send(error)
        
    }

     async function securityFilter(code){

        try {

            const actualprods = await prodManager.getProducts();
            const newfilter = await actualprods.filter(element => element.code == code)
            if (newfilter.length > 0) {

               await res.status(500).send("Este producto con code: "+code+" Ya se encuentra existente en otro producto")
                
                 return 
            }else{

                    await res.status(201).send({"se Agregó un nuevo producto": actualprods})

            }  
            
        } catch (error) {
            console.log("Algo más salió mal en securityFilter ==>",error);
        }


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