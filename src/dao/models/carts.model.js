import mongoose from "mongoose";

const cartsScheme = new mongoose.Schema({

    products: {
		type: Array,
		default: [],
	}

})

export const cartsModel = mongoose.model("carts", cartsScheme)