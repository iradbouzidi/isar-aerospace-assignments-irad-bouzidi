import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Rings } from "react-loader-spinner";
import axios from "axios";

const AssignmentA = () => {
  const [data, setData] = useState(null); // To store fetched data
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const apiUrl = process.env.REACT_APP_GET_API; // API URL from environment variables

  // Function to fetch data from API
  const fetchData = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.get(apiUrl); // Fetch data from the specified API endpoint
      setData(response.data); // Store fetched data in state variable
    } catch (error) {
      console.error("Error fetching data:", error); // Log error if fetching fails
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Set loading state to false after a delay (simulating loading time)
      }, 700);
    }
  };

  // useEffect hook to perform actions on component mount
  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // Function to handle refresh button click
  const handleRefreshClick = () => {
    fetchData(); // Fetch data when the refresh button is clicked
  };

  return (
    <div className="assignment">
      {/* Conditional rendering based on loading state and data availability */}
      {isLoading ? (
        <div className="loader-container">
          <Rings className="loader" color="#87CEEB" height={300} width={300} />
        </div>
      ) : data ? ( // Display data if available
        <div>
          {/* Displaying gauge components for velocity, altitude, and temperature */}
          <h1>Spectrum Status</h1>
          <div className="gaugeContainer">
            <div className="gaugeItem">
              <h2>Velocity</h2>
              <ReactSpeedometer
                minValue={-100}
                maxValue={100}
                value={data.velocity}
                needleColor="blue"
                startColor="lightblue"
                segments={10}
                endColor="darkblue"
                height={300}
                width={300}
              />
            </div>
            <div className="gaugeItem">
              <h2>Altitude</h2>
              <ReactSpeedometer
                minValue={-45000}
                maxValue={-35000}
                value={Math.abs(data.altitude)}
                needleColor="green"
                startColor="lightgreen"
                segments={10}
                endColor="darkgreen"
                height={300}
                width={300}
              />
            </div>
            <div className="gaugeItem">
              <h2>Temperature</h2>
              <ReactSpeedometer
                minValue={-50}
                maxValue={50}
                value={Math.abs(data.temperature)}
                needleColor="red"
                startColor="orange"
                segments={10}
                endColor="darkred"
                height={300}
                width={300}
              />
            </div>
          </div>
          {/* Displaying statusMessage, isAscending and isActionRequired */}
          <p>
            <b>Status Message:</b> {data.statusMessage}
          </p>
          <p>
            <b>Is Ascending:</b> {data.isAscending ? "Yes" : "No"}
          </p>
          <p>
            <b>Is Action Required:</b> {data.isActionRequired ? "Yes" : "No"}
          </p>
        </div>
      ) : (
        // Display message when no data is available
        <p>No data available.</p>
      )}
      {/* Button to refresh data */}
      <button className="refreshButton" onClick={handleRefreshClick}>
        Refresh
      </button>
    </div>
  );
};

export default AssignmentA;
