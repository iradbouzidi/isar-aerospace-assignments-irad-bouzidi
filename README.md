# Isar Aerospace Assignments

This repository contains the Isar Aerospace Assignments that comprises two main components: AssignmentA and AssignmentB.
Assignment C is Attached in a PDF file.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using `npm ci`.
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add environment variables:
     ```
     REACT_APP_GET_API=your_get_api_endpoint
     REACT_APP_SOCKET_SERVER=your_socket_server_endpoint
     REACT_APP_POST_API=your_post_api_endpoint
     ```
4. Run the application using `npm start`.

## Components

### AssignmentA

The `AssignmentA` component fetches data from an API endpoint defined by `REACT_APP_GET_API` in the environment variables. It displays received data on a dashboard, showcasing the status of a spectrum using gauge representations for velocity, altitude, and temperature. It also checks for loading states and handles data refresh on button click.

### AssignmentB

The `AssignmentB` component involves WebSocket communication with a server specified by `REACT_APP_SOCKET_SERVER`. It also performs a POST request to an API endpoint defined by `REACT_APP_POST_API`. It displays spectrum status information in gauges similar to AssignmentA. If an action is required based on the received data, it triggers a modal to prompt the user for action.

## Dependencies

- `react` - The core library for building the user interface in React.
- `react-d3-speedometer` - A library used to create speedometer-like gauge components.
- `react-bootstrap` - Utilized for UI elements such as buttons and modals.
- `axios` - For making HTTP requests to fetch and send data.
- `react-router-dom` - Used for routing within the application.
