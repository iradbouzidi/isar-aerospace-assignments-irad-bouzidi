import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AssignmentB = () => {
  const [data, setData] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [show, setShow] = useState(false);
  const socketServer = process.env.REACT_APP_SOCKET_SERVER;
  const apiUrl = process.env.REACT_APP_POST_API;

  // Function to handle Modal close and trigger a componentDidMount call
  const handleClose = () => {
    componentDidMount(); // Call the componentDidMount function to perform a POST request
    setShow(false); // Close the Modal
  };

  // Function to show the Modal
  const handleShow = () => setShow(true);

  // Function to read from WebSocket
  const readSocket = () => {
    const socket = new WebSocket(socketServer); // Create a WebSocket connection

    socket.onopen = () => {
      console.log("WebSocket connected"); // Log when WebSocket connection is established
    };

    socket.onmessage = (event) => {
      setData(event.data); // Update the state with received data from WebSocket
    };

    socket.onclose = () => {
      console.log("WebSocket closed"); // Log when WebSocket connection is closed
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error); // Log WebSocket errors
    };

    return () => {
      socket.close(); // Close the WebSocket connection when component unmounts
    };
  };

  // Function to perform a POST request using axios
  const componentDidMount = () => {
    axios
      .post(apiUrl) // Send a POST request to the specified API endpoint
      .then(() => this.setState({ action: "your-action-here" })) // Update the state after successful POST
      .catch((error) => {
        console.error("There was an error!", error); // Log errors if POST request fails
      });
  };

  // useEffect hook to read from WebSocket on component mount
  useEffect(() => {
    readSocket(); // Call the readSocket function on component mount
  }, []);

  // useEffect hook to parse received data and display Modal based on parsed data
  useEffect(() => {
    if (data) {
      try {
        const parsedData = JSON.parse(data); // Parse received JSON data
        setParsedData(parsedData); // Store parsed data in state variable
        if (parsedData.IsActionRequired) {
          handleShow(); // Show the Modal if action is required based on parsed data
        }
      } catch (error) {
        console.error("Error parsing JSON:", error); // Log errors if JSON parsing fails
      }
    }
  }, [data]);

  return (
    <div className="assignment">
      <h1>Spectrum Live</h1>
      {parsedData && (
        <div>
          <div className="gaugeContainer">
            <div className="gaugeItem">
              <h2>Velocity</h2>
              <ReactSpeedometer
                minValue={-100}
                maxValue={100}
                value={parsedData.Velocity}
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
                value={parsedData.Altitude}
                needleColor="green"
                startColor="lightgreen"
                segments={5}
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
                value={parsedData.Temperature}
                needleColor="red"
                startColor="orange"
                segments={10}
                endColor="darkred"
                height={300}
                width={300}
              />
            </div>
          </div>
          <p>
            <b>Status Message:</b> {parsedData.StatusMessage}
          </p>
          <p>
            <b>Is Ascending:</b> {parsedData.IsAscending ? "Yes" : "No"}
          </p>
          <p>
            <b>Is Action Required:</b>{" "}
            {parsedData.IsActionRequired ? "Yes" : "No"}
          </p>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title className="pulse">Action Required</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You are required to take action! Please make a decision!
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="btn btn-danger"
                onClick={handleClose}
              >
                Act Now
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AssignmentB;
