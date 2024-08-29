import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  const navigate = useNavigate();
  const handleCreateNavigate = () => {
    navigate("/create-order");
  };

  return (
    <div className="bg-gray-100 h-full">
      <Nav />
      <Card />
      <button
        className="w-[150px] bg-black text-white h-[40px] rounded-md float-right mb-[30px] hover:bg-white hover:text-black hover:border-2 hover:border-black transition-colors"
        onClick={() => handleCreateNavigate()}
      >
        Create Order
      </button>
    </div>
  );
};

// CARD THAT CONTAINS A SINGLE ORDER
function Card() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-orders");
        const sortedOrders = response.data.orders.sort(
          (a, b) => new Date(b.OrderedDate) - new Date(a.OrderedDate)
        );

        setOrders(sortedOrders);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

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

  const navigate = useNavigate();
  const handleViewOrderNavigate = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p>Loading.....</p>;

  return (
    <>
      <ul className="grid grid-cols-3 justify-items-center gap-10 py-10">
        {orders.map((order) => (
          <li key={order._id} className="bg-white w-[400px] h-[350px] p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer rounded-md">
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
            <button
              className="w-[150px] bg-black text-white h-[40px] rounded-md float-right mt-[20px] hover:bg-white hover:text-black hover:border-2 hover:border-black"
              onClick={() => handleViewOrderNavigate(order._id)}
            >
              View Order
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AllOrders;
