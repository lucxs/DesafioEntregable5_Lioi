import express from 'express'
import productManager from '../ProductManager.js';


const viewRouter =express();


//Paso la lista de productos a home.handlebars
viewRouter.get('/', async(req, res)=>{

    try {

        const prdManager = new productManager();

            const allprods = await prdManager.getProducts();

            await res.render('home', {allprods})
        
    } catch (error) {

        console.log("Algo salió mal =>", error);
        
    }

})


viewRouter.get('/realtimeproducts',(req, res)=>{


    res.render('realtimeproducts');

}) 

export default viewRouter;