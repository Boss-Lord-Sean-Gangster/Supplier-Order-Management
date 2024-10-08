# Order Management System

## Overview

The **Order Management System** is a web application built with React that allows users to create, view, and manage orders efficiently. This system is designed to help businesses track their orders and suppliers, providing a clear overview of order statuses, supplier details, and order histories. The system is integrated with a backend API that facilitates data retrieval and order management.

## Features

- **Order Creation**: Easily create new orders using a form interface that automatically sets the order date and initial status.
- **Order Tracking**: View and manage all orders in a grid layout, sorted by the most recent order date.
- **Supplier Management**: View detailed information about the suppliers associated with each order.
- **Order Status Display**: Visual indicators for order statuses using colored dots (e.g., red for canceled, green for completed, yellow for pending).
- **Responsive Design**: The application is fully responsive, ensuring a seamless experience across devices.
- **Real-Time Updates**: Fetch and display orders from the backend in real-time, with loading indicators to enhance user experience.

## Tech Stack

- **Frontend**: 
  - [React.js](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/) for responsive styling
  - [Axios](https://axios-http.com/) for making HTTP requests to the backend API
  - [React Router](https://reactrouter.com/) for navigation between pages

- **Backend**: 
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/) for creating API endpoints
  - [MongoDB](https://www.mongodb.com/) as the database to store orders and supplier information

- **Deployment**:
  - [GitHub](https://github.com/) for version control and code hosting
  - [MongoDB Atlas](https://www.mongodb.com/atlas) for database hosting

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn package manager
- MongoDB instance (local or cloud-based)

### Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Boss-Lord-Sean-Gangster/Supplier-Order-Management
    ```

2. **Install Dependencies**:
    ```bash
    cd Supplier-Order-Management
    npm install
    ```

3. **Set Up Environment Variables**:
    - Create a `.env` file in the root directory.
    - Add your MongoDB connection string and other necessary environment variables.

4. **Run the Application**:
    ```bash
    npm start
    ```

5. **View the Application**:
    - Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

### Creating an Order

1. Click on the "Create Order" button.
2. Fill in the form with the order details (e.g., name, supplier, quantity).
3. Submit the form to create a new order.

### Viewing Orders

1. The home page displays all orders in a grid format.
2. Click on any order to view more details.
3. The status of each order is indicated by a colored dot for easy identification.

### Managing Suppliers

1. Each order displays the associated supplier's name.
2. Detailed information about the supplier is shown when viewing an order.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please reach out to [Nikhil Sharma](mailto:nicks14368@gmail.com).
