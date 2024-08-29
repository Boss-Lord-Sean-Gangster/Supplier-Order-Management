import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateSupplier = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [rating, setRating] = useState("1");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const navigate = useNavigate();

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        // console.log("Location fetched:", { latitude, longitude });
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location.latitude || !location.longitude) {
      console.error("Location is not set.");
      return;
    }

    const newSupplier = {
      name,
      email,
      phone: number,
      rating,
      location,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/create-supplier",
        newSupplier,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Supplier Created:", response.data);
      navigate("/all-suppliers");
    } catch (error) {
      console.error(
        "Error creating supplier:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="bg-white p-8 rounded-lg shadow-lg w-2/3 max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Create Supplier</h2>
        <p className="text-center text-gray-600 mb-6">
          Add a new supplier to your list
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
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
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
            <label htmlFor="number" className="mb-2">
              Number
            </label>
            <input
              type="number"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              id="number"
              className="border-2 border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="rating" className="mb-2">
              Rating
            </label>
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
            type="button"
            onClick={getLocation}
            className="mt-4  bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border-2 hover:border-black transition"
          >
            Get Location
          </button>
          <button
            type="submit"
            className="mt-6 bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border-2 hover:border-black transition"
          >
            Add Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSupplier;
