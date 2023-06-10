import  {Router, query} from "express";
import productManager from "../dao/ProductManager.js";
import { prodsRouter } from "./products.router.js";
import cartManager from "../dao/cartManager.js";

const cartsRouter = Router();

//Instancio la clase de los productos
const prodManager = new productManager();
//Instancio la clase del carrito
const cart =  new cartManager();

//Ruta raiz que crea cart
cartsRouter.post('/', async(req, res)=>{

        try {   
                await cart.addCart();
                
                await res.status(201).send(cart);
                
                
        } catch (error) {
                
                res.status(500).send(error)
        }
        
})

        //Listando prods que pertenecen a los cart
cartsRouter.get('/:cid', async(req,res)=>{


        try {
               let cartProdById = await cart.getCartbyId(req.params.cid);
                
                await res.status(200).send(cartProdById);
                
        } catch (error) {

                res.status(501).send(error)
                
        }


 })

cartsRouter.post('/:cid/product/:pid', async(req, res)=>{

                try {
                                //Agrego uno a uno para que impacte la actualizacion del quantity
                                //Si es que voy al mismo CID de cart. (CID: 4 - PID:2)
                        // const updatedCartProd1 = await cart.addToCart(req.params.cid, req.params.pid);
                        // const updatedCartProd2 = await cart.addToCart(req.params.cid, req.params.pid);
                        // const updatedCartProd3 = await cart.addToCart(req.params.cid, req.params.pid);
                        // const updatedCartProd4 = await cart.addToCart(req.params.cid, req.params.pid);
                                
                        // intento con el siguiente grupo de instancias: (CID: 1 - PID: 1)

                         const updatedCartProd1 = await cart.addToCart(req.params.cid, req.params.pid);
                         const updatedCartProd2 = await cart.addToCart(req.params.cid, req.params.pid);
                        // const updatedCartProd3 = await cart.addToCart(req.params.cid, req.params.pid);
                        // const updatedCartProd4 = await cart.addToCart(req.params.cid, req.params.pid);
                        res.status(200).send(updatedCartProd2);
                        
                } catch (error) {

                        res.status(501).send(error)
                        
                }

})

export {cartsRouter}