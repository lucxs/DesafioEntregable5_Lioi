import mongoose from "mongoose";

const productsScheme = new mongoose.Schema({

    title:{
        type: String
    }, 
    description:{
        type: String
    },
    price:{
        type: Number
    },
    thumbnail:{
        type: String
    },
    code:{
        type:Number
    },
    stock:{
        type:Number
    },
    status:{
        type:Boolean
    },
    marca:{
        type:String
    }

})

export const productsModel = mongoose.model("products", productsScheme)