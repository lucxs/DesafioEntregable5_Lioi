import { productsModel } from "./models/products.model.js";

class productsServices {

         constructor(){

            this.prodModel = productsModel
         }

         
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


          async updateProduct(id, newObject){
            try {
               const filtro = {};
               filtro[newObject.campo] = newObject.valor;
                           return await this.prodModel.updateOne({_id:id},{$set: filtro})
                    
            } catch (error) {
                
                console.log(error);
            }
            
        

    }



          async deleteProduct(data){

             await this.prodModel.deleteOne({_id: data.toString()})


          }


}

export const prodsServices = new productsServices();