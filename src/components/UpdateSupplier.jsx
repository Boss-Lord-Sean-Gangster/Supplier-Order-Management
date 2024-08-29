import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSupplier = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [rating, setRating] = useState("5");
  const navigate = useNavigate();
  const { id } = useParams(); // Get the supplier ID from the URL

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/supplier/${id}`);
        const supplier = response.data.supplier;
        setName(supplier.name);
        setEmail(supplier.email);
        setNumber(supplier.phone);
        setRating(supplier.rating.toString());
      } catch (error) {
        console.log("Error fetching supplier details:", error);
      }
    };
    fetchSupplier();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSupplier = {
      name,
      email,
      phone: number,
      rating,
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/update-supplier/${id}`,
        updatedSupplier
      );
      console.log("Supplier Updated", response.data);
      navigate('/all-suppliers');
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
        <h2 className="text-2xl font-bold text-center mb-4">Update Supplier</h2>
        <p className="text-center text-gray-600 mb-6">
          Update the details of the supplier
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="border-2 border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="border-2 border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="number" className="mb-2">Number</label>
            <input
              type="text"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              id="number"
              className="border-2 border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="rating" className="mb-2">Rating</label>
            <select
              name="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="border-2 border-gray-300 p-2 rounded"
            >
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-6 bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border-2 hover:border-black transition"
          >
            Update Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSupplier;
