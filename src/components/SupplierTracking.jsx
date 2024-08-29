import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SupplierTracking = () => {
  const location = useLocation(); // Access the passed state
  const [supplierId, setSupplierId] = useState('');
  const [locationData, setLocationData] = useState(null);

  // Fetch supplier details by ID
  const getSupplierById = async (supplierId) => {
    try {
      const response = await axios.get(`http://localhost:3000/supplier/${supplierId}`);
      return response.data.supplier;
    } catch (error) {
      console.error("Error fetching supplier data:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (location.state?.supplierId) {
      setSupplierId(location.state.supplierId); // Pre-fill the input field
    }
  }, [location.state?.supplierId]);

  useEffect(() => {
    if (supplierId) {
      const fetchLocation = async () => {
        try {
          const supplier = await getSupplierById(supplierId);
          setLocationData(supplier.location);
        } catch (error) {
          console.error('Error fetching supplier location:', error);
        }
      };

      fetchLocation();

      const intervalId = setInterval(fetchLocation, 5000); // Update every 5 seconds

      return () => clearInterval(intervalId); // Clear interval on component unmount
    }
  }, [supplierId]);

  const handleSupplierIdSubmit = (e) => {
    e.preventDefault();
    if (supplierId) {
      setSupplierId(supplierId);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-black">Real-Time Supplier Tracking</h1>
      
      <form onSubmit={handleSupplierIdSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Enter Supplier ID"
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black border border-black"
        >
          Track Supplier
        </button>
      </form>

      {locationData && locationData.latitude && locationData.longitude ? (
        <div className="w-full max-w-4xl mt-6">
          <iframe
            title="Supplier Location"
            src={`https://www.google.com/maps?q=${locationData.latitude},${locationData.longitude}&hl=es;z=14&output=embed`}
            width="100%"
            height="400px"
            className="border-2 border-black rounded-lg"
          />
        </div>
      ) : (
        <p className="text-red-500 mt-4">No location data available for this supplier.</p>
      )}
    </div>
  );
};

export default SupplierTracking;
