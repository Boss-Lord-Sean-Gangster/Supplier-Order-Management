import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { FaStar, FaRegStar, FaTrashAlt } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

const StarRating = ({ rating }) => {
  const totalStars = 5; // Total number of stars

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => (
        <span key={index}>
          {index < rating ? (
            <FaStar className="text-black" />
          ) : (
            <FaRegStar className="text-black" />
          )}
        </span>
      ))}
    </div>
  );
};

const SupplierDetails = () => {
  const [supplier, setSupplier] = useState(null);
  const { id } = useParams(); // Get the supplier ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/supplier/${id}`
        );
        setSupplier(response.data.supplier);
      } catch (error) {
        console.log("Error fetching supplier details:", error);
      }
    };
    fetchSupplier();
  }, [id]);

  const handleRemove = async () => {
    try {
      await axios.post(`http://localhost:3000/delete-supplier/${id}`);
      navigate("/all-suppliers");
    } catch (error) {
      console.log("Error removing supplier:", error);
    }
  };

  // NAVIGATING TO THE UPDATE PAGE OF SUPPLIER
  const handleUpdate = () => {
    navigate(`/supplier/update/${id}`);
  };

  // NAVIGATING TO THE TRACKING PAGE WITH RESPECTIVE SUPPLIER ID
  const handleViewTrackingNavigate = ()=>{
    navigate('/tracking', { state: { supplierId: id } });
  }

  if (!supplier) return <p>Loading...</p>;

  return (
    <>
    <Nav/>
    <div className="flex flex-col w-full h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-5/6 h-[400px] max-w-4xl">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-4xl font-bold text-black">{supplier.name}</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between mt-5">
            <span className="text-slate-400 text-lg">Email:</span>
            <span className="text-black text-lg">{supplier.email}</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <span className="text-slate-400 text-lg">Phone:</span>
            <span className="text-black text-lg">{supplier.phone}</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <span className="text-slate-400 text-lg">Rating:</span>
            <div className="text-black text-lg">
              <StarRating rating={supplier.rating} />
            </div>
          </div>
          <div className="flex gap-4 mt-5">
            <button
              onClick={handleRemove}
              className="bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border-2 hover:border-black flex items-center gap-2"
            >
              <FaTrashAlt />
              Remove Supplier
            </button>
            <button
              onClick={handleUpdate}
              className="bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border-2 hover:border-black"
            >
              Update Supplier
            </button>
            <button
              onClick={handleViewTrackingNavigate}
              className="bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border-2 hover:border-black"
            >
              Track Supplier
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SupplierDetails;
