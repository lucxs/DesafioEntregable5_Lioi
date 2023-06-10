import express from 'express'
//import productManager from '../dao/ProductManager.js';
import { prodsServices } from '../dao/products.service.js';

const viewRouter =express();


//Paso la lista de productos a home.handlebars
viewRouter.get('/', async(req, res)=>{

    try {

        // const prdManager = new productManager();

        //     const allprods = await prdManager.getProducts();

            const allProds = await prodsServices.getProducts();

            await res.render('home', {allProds})
        
    } catch (error) {

        console.log("Algo salió mal =>", error);
        
    }

})


viewRouter.get('/realtimeproducts',(req, res)=>{


    res.render('realtimeproducts');

}) 

viewRouter.get('/chat', (req, res)=>{


        res.render('chat')

})

export default viewRouter;