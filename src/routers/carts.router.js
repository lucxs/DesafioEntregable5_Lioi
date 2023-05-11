import  {Router} from "express";

const carts = "hola carts";

const cartsRouter = Router();

cartsRouter.get("/", (req, res)=>{


        res.send(carts);

})

export {cartsRouter}