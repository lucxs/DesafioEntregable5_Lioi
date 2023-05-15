import  {Router, query} from "express";
import productManager from "../ProductManager.js";
import { prodsRouter } from "./products.router.js";
import cartManager from "../cartManager.js";

const cartsRouter = Router();

//Instancio la clase de los productos
const prodManager = new productManager();
//Instancio la clase del carrito
const cart =  new cartManager();

//Ruta raiz que crea cart
cartsRouter.post('/', async(req, res)=>{

        try {
                await cart.addCart();
                await cart.addCart();
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
                        const prodsDetail = await prodManager.DetailsProdsToCart(req.params.pid)
                        const updatedCartProd = await cart.addToCart(req.params.cid, prodsDetail);
                        res.status(200).send(updatedCartProd);
                        //  cart.addToCart(prodsDetail)
                        //  res.status(201).send(carts.flat())
                } catch (error) {

                        res.status(501).send(error)
                        
                }

})

export {cartsRouter}