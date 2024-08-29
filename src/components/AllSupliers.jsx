import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";
import Nav from "./Nav";
import "../index.css";
import { useNavigate } from "react-router-dom";



const AllSupliers = () => {

  // NAVIGATING TO CREATE A SUPPLIER 
    const navigate = useNavigate();
    const handleNavigate = ()=>{
        navigate('/create-supplier');
    }
  return (
    <div className="bg-gray-100 h-full">
      <Nav/>
      <Card />
      <button className="w-[150px] bg-black text-white h-[40px] rounded-md float-right mr-10 mt-[20px] hover:bg-white hover:text-black hover:border-2 hover:border-black" onClick={handleNavigate}>
        Create Supplier
      </button>
    </div>
  );
};

// FUNCTION TO CONVERT THE NUMBER RATINGS INTO STARS
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

// CARD THAT CONTAINS A SINGLE SUPPLIER
function Card() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-suppliers");
        const sortedSuppliers = response.data.suppliers.sort((a,b)=>b.rating - a.rating)
        setSuppliers(sortedSuppliers);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSupplier();
  }, []);

  // NAVIGATING TO A PARTICULAR SUPPLIER
  const navigate = useNavigate();
  const handleViewSupplierNavigate = (supplierId)=>{
    navigate(`/supplier/${supplierId}`)
  }

  if (loading) return <p>Loading.....</p>;
  return (
    <>
      <ul className="grid grid-cols-3 justify-items-center gap-10 py-10">
        {suppliers.map((supplier) => (
          <li className="bg-white w-[400px] h-[300px] p-6 bg-background shadow-lg hover:shadow-xl transition-shadow cursor-pointer rounded-md">
            <h2 className=" p-5 text-4xl text-slate-400">{supplier.name}</h2>
            <div className="flex flex-col gap-[20px]">
              <div className="align-baseline w-[300px] px-5">
                <h3 className="text-slate-400 float-left">Contact</h3>
                <h3 className="float-right">{supplier.email}</h3>
              </div>
              <div className="align-baseline w-[300px] px-5">
                <h3 className="text-slate-400 float-left">Phone</h3>
                <h3 className="float-right">{supplier.phone}</h3>
              </div>
              <div className="flex justify-between align-baseline w-[300px] px-5">
                <h3 className="text-slate-400 ">Rating</h3>
                <StarRating rating={supplier.rating} />
              </div>
            </div>
            <button className="w-[150px] bg-black text-white h-[40px] rounded-md float-right mt-[20px] hover:bg-white hover:text-black hover:border-2 hover:border-black" onClick={()=>handleViewSupplierNavigate(supplier._id)}>
              View Supplier
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AllSupliers;
