import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-orders");
        const filteredOrders = response.data.orders.filter((order) => {
          const today = new Date();
          const orderDate = new Date(order.OrderedDate);
          const timeDiff = today - orderDate;
          const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          return daysDiff <= 2; // Only show orders from today, 1 day ago, or 2 days ago
        });
        setOrders(filteredOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/all-orders');
  };

  const handleCreateNavigate = () => {
    navigate('/create-order');
  };

  const handleViewOrderNavigate = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const getDaysAgo = (date) => {
    const today = new Date();
    const orderDate = new Date(date);
    const timeDiff = today - orderDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if (daysDiff === 0) return "Ordered Today";
    return `${daysDiff} days ago`;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "canceled":
        return "bg-red-500";
      case "completed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col w-4/5 ml-[150px] mt-[50px] p-[40px] shadow-lg bg-slate-100 rounded-md">
      <h1 className="text-6xl py-5 font-semibold">Current Orders</h1>
      <h4 className="text-slate-400">Your current order</h4>
      <ul className="flex flex-col gap-10 mt-10">
        {orders.map((order) => (
          <li key={order._id} className="bg-white w-full h-[350px] p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer rounded-md">
            <h2 className="p-5 text-4xl text-slate-400">{order.name || 'Unknown Order'}</h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between w-full px-5">
                <h3 className="text-slate-400">Supplier</h3>
                <h3>{order.supplier?.name || 'Unknown Supplier'}</h3>
              </div>
              <div className="flex justify-between w-full px-5">
                <h3 className="text-slate-400">Date</h3>
                <h3>{getDaysAgo(order.OrderedDate)}</h3>
              </div>
              <div className="flex justify-between w-full px-5">
                <h3 className="text-slate-400">Quantity</h3>
                <h3>{order.quantity}</h3>
              </div>
              <div className="flex justify-between w-full px-5 items-center">
                <h3 className="text-slate-400">Status</h3>
                <div className="flex items-center gap-2">
                  <h3 className="capitalize">{order.status}</h3>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`}></div>
                </div>
              </div>
            </div>
            <button className="w-[150px] bg-black text-white h-[40px] rounded-md float-right mt-[20px] hover:bg-white hover:text-black hover:border-2 hover:border-black" onClick={() => handleViewOrderNavigate(order._id)}>
              View Order
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-10">
        <button className="w-[150px] bg-black text-white h-[40px] rounded-md float-right mt-[40px] hover:bg-white hover:text-black hover:border-2 hover:border-black transition-colors" onClick={() => handleNavigate()}>
          More Orders
        </button>
        <button className="w-[150px] bg-black text-white h-[40px] rounded-md float-right mt-[40px] hover:bg-white hover:text-black hover:border-2 hover:border-black transition-colors" onClick={() => handleCreateNavigate()}>
          Create Order
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
