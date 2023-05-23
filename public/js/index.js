const socket = io();

socket.on('products', (allprods)=>{


        productsRender(allprods)

})


      function productsRender(allprods){

     
     const html = allprods.map((prod)=>{
     
         return `
         <div class="prodCars">
             <ul>
                <li class="idoculto">${prod.id}</li>
                 <li>Title: ${prod.title}</li>
                 <li>Description: ${prod.description}</li>
                 <li>Price: ${prod.price}</li>
                 <li>thumbnail: ${prod.thumbnail}</li>
                 <li>Code: ${prod.code}</li>
                 <li>Stock: ${prod.stock}</li>
                 <li>Status: ${prod.status}</li>
                 <li>Category: ${prod.category}</li>
             </ul>
         
         </div>
         
         `
     }).join(' ');
     
     document.getElementById('listProductsRealTime').innerHTML = html


}
    //Funcion del onclick para agregar productos

function addProduct(){
    
    event.preventDefault()

    let title = document.getElementById("title").value
    let description = document.getElementById("description").value
    let price = document.getElementById("price").value
    let thumbnail = document.getElementById("thumbnail").value
    let code = document.getElementById("code").value
    let stock = document.getElementById("stock").value
    let status = document.getElementById("status").value
    let category = document.getElementById("category").value

    socket.emit('addingProds', {"title": title,"description":description,"price":price,"thumbnail":thumbnail,"code":code,"stock":stock,"status":status,"category":category})

        alert("Se agrego un nuevo producto")
}


//Funcion del onclick para eliminar productos



 function deleteProd(){

    event.preventDefault()

    let idProd = document.getElementById("idprod").value

              socket.emit('prodIdToDelete', idProd)

}


