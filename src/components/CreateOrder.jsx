import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [supplierName, setSupplierName] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-suppliers");
        setSuppliers(response.data.suppliers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find the supplier by name
    const matchedSupplier = suppliers.find(
      (supplier) => supplier.name.toLowerCase() === supplierName.toLowerCase()
    );

    if (!matchedSupplier) {
      alert("Supplier not found");
      return;
    }

    // Automatically set the date and status
    const currentDate = new Date().toISOString();
    const status = "ordered";

    const newOrder = {
      name,
      quantity,
      supplier: matchedSupplier._id,
      orderedDate: currentDate,
      status,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/create-order",
        newOrder
      );
      console.log("Order Created", response.data);
      navigate('/all-orders')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="bg-white p-8 rounded-lg shadow-lg w-2/3 max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Create Order</h2>
        <p className="text-center text-gray-600 mb-6">
          Order New Item
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="border-2 border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="quantity" className="mb-2">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              id="quantity"
              className="border-2 border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="supplierName" className="mb-2">
              Supplier Name
            </label>
            <input
              type="text"
              name="supplierName"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              id="supplierName"
              className="border-2 border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border-2 hover:border-black transition" 
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
