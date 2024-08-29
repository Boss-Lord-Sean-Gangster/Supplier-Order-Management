import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { FaStar, FaRegStar, FaTrashAlt } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

// FUNCTION TO CONVERT NUMBER RATINGS TO STARS
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

const Order = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams(); // Get the supplier ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/order/${id}`
        );
        setOrder(response.data.order);
      } catch (error) {
        console.log("Error fetching order details:", error);
      }
    };
    fetchOrder();
  }, [id]);

  // NAVIGATING TO THE TRACKING PAGE WITH THE RESPECTIVE SUPPLIER ID ATTACHED TO THE ORDER 
  const handleViewTrackingNavigate = ()=>{
    navigate('/tracking', { state: { supplierId: order.supplier._id } });
  }

  const getDaysAgo = (date) => {
    const today = new Date();
    const orderDate = new Date(date);
    const timeDiff = today - orderDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if(daysDiff==0)return `Ordered Today`;
    return `${daysDiff} days ago`;
  };

  const handleRemove = async () => {
    try {
      await axios.post(`http://localhost:3000/delete-order/${id}`);
      navigate("/all-orders");
    } catch (error) {
      console.log("Error removing order:", error);
    }
  };

const viewSupplier = async () => {
    const supplierId = order.supplier._id; // Ensure you're using the correct field
    if (!supplierId) {
        console.error("Supplier ID is undefined");
        return;
    }
    try {
        await axios.get(`http://localhost:3000/supplier/${supplierId}`);
        navigate(`/supplier/${supplierId}`); // Ensure correct navigation
    } catch (error) {
        console.log("Error fetching supplier:", error);
    }
};


  if (!order) return <p>Loading...</p>;

  return (
    <>
    <Nav/>
    <div className="flex flex-col w-full h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-5/6 h-[450px] max-w-4xl">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-4xl font-bold text-black">{order.name}</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between mt-5">
            <span className="text-slate-400 text-lg">Supplier:</span>
            <span className="text-black text-lg">{order.supplier.name}</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <span className="text-slate-400 text-lg">Quantity:</span>
            <span className="text-black text-lg">{order.quantity}</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <span className="text-slate-400 text-lg">Date:</span>
            <span className="text-black text-lg">{getDaysAgo(order.OrderedDate)}</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <span className="text-slate-400 text-lg">Status:</span>
            <div className="text-black text-lg">
            <span className="text-black text-lg">{order.status}</span>
              {/* <StarRating rating={order.status} /> */}
            </div>
          </div>
          <div className="flex gap-4 mt-5">
            <button
              onClick={()=>handleRemove()}
              className="bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border-2 hover:border-black flex items-center gap-2"
            >
              <FaTrashAlt />
              Cancel Order
            </button>
            <button
              onClick={()=>viewSupplier()}
              className="bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border-2 hover:border-black"
            >
              View Supplier
            </button>
            <button
              onClick={()=>handleViewTrackingNavigate()}
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

export default Order;
