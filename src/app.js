import  express  from "express";
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import {Server} from 'socket.io'
import {prodsRouter} from "./routers/products.router.js"
import { cartsRouter } from "./routers/carts.router.js";
import viewRouter from './routers/views.router.js'
// import productManager from "./dao/ProductManager.js";
import { prodsServices } from "./dao/products.service.js";
import { msgService } from "./dao/message.service.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


//Parte de la primera entrega
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartsRouter)

//-----------------------------------------------------------------------------------------------------//



//---------------------------------Desafio entregable 5----------------------------------------------------///////////////////////////

mongoose.connect('mongodb+srv://lioilucas75:Lucas024!!@codercluster.fg4paop.mongodb.net/?retryWrites=true&w=majority');

const httpServer = app.listen(8080, ()=> console.log("Escuchando puerto 8080"))

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views','views/');
app.set('view engine','handlebars');
app.use(express.static('public'));


app.use('/', viewRouter);


socketServer.on('connection', async (socket)=>{

    try {

//----------------------Traer prods con fileSystem------------------//

    //     const prdManager = new productManager();

    //     const allprods = await prdManager.getProducts();

 //------------------------------------------------------------------//       

                //Traer con ProductsServices y MongoDB//

                const allprods = await prodsServices.getProducts()

    //     console.log("Nuevo cliente conectado");

    // //Envio la lista de productos

           socket.emit('products', allprods);

    // Recibiendo caracterisiticas de producto nuevo

        socket.on('addingProds', async(data)=>{

            try {
                //-----------Agrego el producto en el fileSystem---------------------------

                //guardando en variables el valor de cada dato del objeto

                // let title = data.title;
                // let description = data.description;
                // let price = data.price;
                // let thumbnail = data.thumbnail;
                // let code = data.code;
                // let stock = data.stock;
                // let status = data.status;
                // let category = data.category;

            //  await prdManager.addProduct(title, description, price, thumbnail, code, stock, status, category)
//-----------------------------------------Hasta acá FileSystem------------------------------------------//
                //Agrego producto en con Products.Service y usando Mongo

                await prodsServices.addProduct(data);
                
            } catch (error) {

                console.log("Algo salió mal en el addingProds ==>", error);
                
            }

            

        })

        //Elimino el producto

        socket.on('prodIdToDelete', async(data)=>{

            try {

                 //await prdManager.deleteProduct(data)
                 await prodsServices.deleteProduct(data)
                
            } catch (error) {

                console.log("Error en app.js en el envio del id para deletear producto ==>", error);
                
            }

        })


                //Socket chat


                socket.on("message", async(data)=>{

                            try {


                                 await msgService.addMessages(data)

                                 const MSGS = await msgService.getMessages()

                                 return await socketServer.emit("sendingMSGs", MSGS)
                                
                            } catch (error) {

                                console.log(error
                                    );
                                
                            }
                       
                        

                })

        
    } catch (error) {

        console.log("Algo salió mal en el socket connection =>", error);
        
    }


})












