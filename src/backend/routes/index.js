import express from "express";
import { Supplier,Order } from "../db/index.js";
import cors from "cors";


const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());


// FOR CREATING A USER
app.post("/create-supplier", async (req, res) => {
  const { name, email, phone, rating, location } = req.body;
  if (!name || !email || !phone || !rating || !location) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const newSupplier = new Supplier({
      name,
      email,
      phone,
      rating,
      location
    });
    await newSupplier.save();
    res.json({ msg: "Supplier created", data: newSupplier });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});


// UPDATING LOCATION OF THE SUPPLIER
app.post('/update-supplier-location/:id', async (req, res) => {
  const { id } = req.params;
  const { latitude, longitude } = req.body;

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ msg: 'Latitude and Longitude must be numbers' });
  }

  try {
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ msg: 'Supplier not found' });
    }

    supplier.location = { latitude, longitude };
    await supplier.save();

    res.json({ msg: 'Location updated', location: supplier.location });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});


// FOR LISTING ALL THE SUPPLIERS
app.get("/get-suppliers", async(req, res) => {
  const suppliers = await Supplier.find();
  res.json({
    suppliers
  });
})


// FOR LISTING A PARTICULAR SUPPLIER VIA ID
app.get("/supplier/:id", async(req, res) => {
  const {id} = req.params;
  const supplier = await Supplier.findById(id);
  if (!supplier) {
    return res.status(404).send('Supplier not found');
  }
  res.json({
    supplier
  });
})


// FOR UPDATING A SUPPLIER VIA ID 
app.put("/update-supplier/:id", async(req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const products = req.body.products;
  const rating = req.body.rating;
  const supplier = await Supplier.findByIdAndUpdate(id,{
    name,
    email,
    phone,
    products,
    rating
  })
  res.json({
    msg:"supplier updated"
  })
})


// FOR REMOVING A SUPPLIER 
app.post("/delete-supplier/:id", async(req, res) => {
  const id = req.params.id;
  const supplier = await Supplier.findByIdAndDelete(id);
  res.json({
    msg:"supplier deleted"
  });
})


//    ****************** ORDERS ****************** 

// FOR CREATING ORDER
app.post("/create-order", async(req,res)=>{
  const name = req.body.name;
  const quantity = req.body.quantity;
  // const DeliveryDate = req.body.DeliveryDate;
  const status = req.body.status;
  const supplier = req.body.supplier;

  const order = await Order.create({
      name,
      quantity,
      // DeliveryDate,
      status,
      supplier
  });
  res.json({
      msg:"Order Created"
  })
})


// FOR GETTING ALL THE ORDERS
app.get("/get-orders", async(req,res)=>{
  const orders = await Order.find().populate('supplier','name');
  res.json({
      orders
  })
})


// FOR GETTING ONE ORDER VIA ID
app.get("/order/:id", async(req,res)=>{
  const id = req.params.id;
  const order = await Order.findById(id).populate('supplier','name');
  res.json({
      order
  });
})


// FOR DELETING ONE ORDER VIA ID
app.post("/delete-order/:id", async(req,res)=>{
  const id = req.params.id;
  const order = await Order.findByIdAndDelete(id);
  res.json({
      msg: "Order Removed"
  });
})


app.listen(port, () => console.log(`server is running on port ${port}`));
