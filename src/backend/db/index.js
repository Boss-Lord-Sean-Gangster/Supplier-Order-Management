import mongoose from "mongoose";

mongoose.connect("mongodb+srv://nikhilSharma:D0COG94Tsvm5djdi@cluster0.sdk6ns6.mongodb.net/Supplier-management")


const SupplierSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    location: {
      latitude: Number,
      longitude: Number,
    },
    products:[String],
    rating:Number
})

const OrderSchema = new mongoose.Schema({
   supplier:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier'    
   },
   name: String,
   OrderedDate: {
    type: Date,
    default: Date.now
   },
   quantity: Number,
   status: String,
   trackingNumber: String
})

export const Supplier = mongoose.model('Supplier', SupplierSchema);
export const Order = mongoose.model('Order', OrderSchema);

console.log("Database Connected");