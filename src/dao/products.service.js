import { productsModel } from "./models/products.model.js";

class productsServices {

         constructor(){

            this.prodModel = productsModel
         }

         async 

         
          async getProducts(){

                
             return await this.prodModel.find().lean()
                

          }

          async addProduct(data){

                try {

                    return await this.prodModel.create(data);

                } catch (error) {
                    
                        console.log("Error en el addproduct - Product.Service-->",error);
                }

          }

          async deleteProduct(data){

            return this.prodModel.deleteOne({_id: data})

          }


}

export const prodsServices = new productsServices();