import fs from 'fs';

export default class cartManager{
        #id = 0;
        #path = undefined;

        constructor(){

            if (!fs.existsSync('./carts.json')) {

                fs.writeFileSync('./carts.json',JSON.stringify([]))
                
            }

        this.#path = fs.promises.readFile('./carts.json', 'utf-8');

        }

        #getID() {
            // Incremento en 1 el valor de id
            this.#id++; 
            return this.#id;
        }

        async addCart(){

                try {   
                    
                    const cartProducts = await{

                    };

                    //Le agrego el ID
                    cartProducts.id = await this.#getID();

                    //Traigo el array de carts
                    const allCarts = await this.getCarts();

                    //Filtro por si ya existe para controlar que no se duplique
                    const filtro = await allCarts.filter(cart => cart.id == cartProducts.id )

                    if (filtro.length) {

                    console.log("Este producto de ID: ",cart.id, "ya existe");

                    return
                    
                }else{

                        //Pusheo products array to cartsProducts

                       await allCarts.push(cartProducts);

                       await fs.promises.writeFile('./carts.json', JSON.stringify(allCarts))
                }  



                } catch (error) {

                    console.log("Algo salió mal en cartManager.addCart ==>",error);
                    
                }

        }

        async getCarts(){

            try {

                const allCarts = await this.#path;
                return JSON.parse(allCarts); 
                
            } catch (error) {

                console.log("Algo salió mal en cartManager.GetCarts() ==>", error);
                
            }

            

        }


        async getCartbyId(cid){

                  try {

                        //Traigo todos los prods del cart
                    const allCarts = await this.getCarts();

                    const cartsByid = await allCarts.find((cart)=>{

                        return cart.id == cid;

                    } );

                    return cartsByid;


                    
                  } catch (error) {

                    console.log("Algo salió mal en cartManager.getCardById ==>",error);
                    
                  }  

        }

        async addToCart(cid, prodsDetail){

            try {
                    let id = await parseInt(cid); 
                    const allCarts = await this.getCarts();

                     const filterProdCart = await allCarts.filter((prod) =>{

                         return prod.id == id
                     } )
                      const updatingProdCart = await filterProdCart.map((prodcart)=>{

                             return {
                                cid: prodcart.id,
                                pid: prodsDetail.pid,
                                quantity: prodsDetail.quantity
                             }

                      }) 

                    // filterProdCart.push(prodsDetail)
                     
                     return updatingProdCart


            } catch (error) {

                console.log("error addToCart ==>", error);
                
            }


        }


}