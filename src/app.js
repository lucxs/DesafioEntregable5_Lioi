import  express  from "express";
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import {prodsRouter} from "./routers/products.router.js"
import { cartsRouter } from "./routers/carts.router.js";
import viewRouter from './routers/views.router.js'
import productManager from "./ProductManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


//Parte de la primera entrega
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartsRouter)

//-----------------------------------------------------------------------------------------------------//



//---------------------------------Desafio entregable 4----------------------------------------------------///////////////////////////


const httpServer = app.listen(8080, ()=> console.log("Escuchando puerto 8080"))

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views','views/');
app.set('view engine','handlebars');
app.use(express.static('public'));


app.use('/', viewRouter);

socketServer.on('connection', async (socket)=>{

    try {

        const prdManager = new productManager();

        const allprods = await prdManager.getProducts();

        console.log("Nuevo cliente conectado");

    //Envio la lista de productos

          socket.emit('products', allprods);

    // Recibiendo caracterisiticas de producto nuevo

        socket.on('addingProds', async(data)=>{

            try {

                //guardando en variables el valor de cada dato del objeto

                let title = data.title;
                let description = data.description;
                let price = data.price;
                let thumbnail = data.thumbnail;
                let code = data.code;
                let stock = data.stock;
                let status = data.status;
                let category = data.category;

                //Agrego el producto

             await prdManager.addProduct(title, description, price, thumbnail, code, stock, status, category)
                
            } catch (error) {

                console.log("Algo salió mal en el addingProds ==>", error);
                
            }

            

        })
        
    } catch (error) {

        console.log("Algo salió mal =>", error);
        
    }


})












