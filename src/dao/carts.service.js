import { cartsModel } from "./models/carts.model.js";

class cartsService{

        constructor(){

                this.crtModel = cartsModel;

        }

        async createCarts(){

            try {

                return await this.crtModel.create();

            } catch (error) {
                
                    console.log("Error en el createCarts - Product.Service-->",error);
            }

      }


        async getCarts(){

                
            return await this.crtModel.find().lean()
               

         }

}

export const cartServices = new cartsService();