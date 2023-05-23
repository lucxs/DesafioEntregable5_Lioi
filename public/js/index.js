const socket = io();

socket.on('products', (allprods)=>{


        productsRender(allprods)

})


     function productsRender(allprods){


    console.log("Todos los prods",allprods);


     const html = allprods.map((prod)=>{
     
         return `
         <div>
             <ul>
                <li class="idoculto">${prod.id}</li>
                 <li>${prod.title}</li>
                 <li>${prod.description}</li>
                 <li>${prod.price}</li>
                 <li>${prod.thumbnail}</li>
                 <li>${prod.code}</li>
                 <li>${prod.stock}</li>
                 <li>${prod.status}</li>
                 <li>${prod.category}</li>
             </ul>

                <button onClick="deleteProd()">Eliminar</button>
         
         </div>
         
         `
     }).join(' ');
     
     document.getElementById('listProductsRealTime').innerHTML = html


   

}
    //Funcion del onclick para agregar productos

function addProduct(){
    

    let title = document.getElementById("title").value
    let description = document.getElementById("description").value
    let price = document.getElementById("price").value
    let thumbnail = document.getElementById("thumbnail").value
    let code = document.getElementById("code").value
    let stock = document.getElementById("stock").value
    let status = document.getElementById("status").value
    let category = document.getElementById("category").value

    socket.emit('addingProds', {"title": title,"description":description,"price":price,"thumbnail":thumbnail,"code":code,"stock":stock,"status":status,"category":category})


}


//Funcion del onclick para agregar productos





