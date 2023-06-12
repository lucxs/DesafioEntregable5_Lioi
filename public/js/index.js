

const socket = io();

socket.on('products', (allprods)=>{


        productsRender(allprods)

})


      function productsRender(allprods){

     
     const html = allprods.map((prod)=>{
     
         return `
         <div class="prodCars">
             <ul>
                <li class="idoculto">${prod._id}</li>
                 <li>Title: ${prod.title}</li>
                 <li>Description: ${prod.description}</li>
                 <li>Price: ${prod.price}</li>
                 <li>thumbnail: ${prod.thumbnail}</li>
                 <li>Code: ${prod.code}</li>
                 <li>Stock: ${prod.stock}</li>
                 <li>Status: ${prod.status}</li>
                 <li>Marca: ${prod.marca}</li>
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
    let marca = document.getElementById("marca").value

    socket.emit('addingProds', {"title": title,"description":description,"price":price,"thumbnail":thumbnail,"code":code,"stock":stock,"status":status,"marca":marca})

        alert("Se agrego un nuevo producto")
}


//Funcion del onclick para eliminar productos



 function deleteProd(){

    event.preventDefault()

    let idProd = document.getElementById("idprod").value

              socket.emit('prodIdToDelete', idProd)

}


//Seccion del chat

let user;
let Inputmsj = document.getElementById("msj")

Swal.fire({

    title: "Bienvenido",
    input: 'text',
    text: "Ingrese su correo para participar de MiChat",
    icon: "success",
    inputValidator: (value)=>{

        return !value && 'Tenes que identificarte'

    },

    allowOutsideClick: false,

}).then((result)=>{
    user = result.value;
});

 
Inputmsj.addEventListener('keyup', event =>{


    if (event.key == "Enter"){

        let msj = Inputmsj.value;
        if (msj.trim().length > 0){
            socket.emit("message", {"user":user, "message":msj})
            Inputmsj.value = '';
        }
    }

})

    async function chatRender(data){

        try {

            const html = await data.map((dat)=>{

                return `
                <strong>${dat.user}:</strong>
                <p>${dat.message}</p>
                
                `
                    
            })
            .join(' ');

                document.getElementById("blockText").innerHTML = html;
            
        } catch (error) {

            console.log("Algo esta mal en chatRender -->", error);
            
        }

        
}

socket.on("sendingMSGs", async(data)=>{

    try {
        return await chatRender(data)
    } catch (error) {
        console.log(error);
    }

        


})


