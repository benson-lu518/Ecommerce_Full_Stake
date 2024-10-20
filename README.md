# E-commerce Full-Stack - HiJasper

This project is an updated version of the original **Ecommerce Backend API (v2)**, now renamed **HiJasper**.

## Features

- **Order Management**: Create, update, and track customer orders.
- **Order Item Management**: Associate items with orders and manage their quantities.
- **Product Management**: CRUD operations for products, including details like name, price, and availability.
- **Authentication**: Secure endpoints using Auth0 tokens (Login, Logout, Register), and manage user roles.

## Todo: Future Development

- **Payment Integration**: Add support for payment processing.
- **Order Item Editing**: Allow for editing existing order items after they’ve been added to an order.

## Setup

### Prerequisites

- **Java 11+**
- **Maven**
- **Spring Boot**
- **MySQL** (or any relational database)
- **Redis** (for caching)
- **Auth0** (for authentication)
- **Docker** (optional, for containerization)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/ecommerce-hijasper.git
   cd ecommerce-hijasper
   ```
2. **Set up the database**:
   Ensure Mysql is running.

3. **Set up Redis**:
   Ensure Redis is running.

4. **Set up Auth0**:
   - Go to [Auth0](https://auth0.com/) and create an account.
   - Create a new application and note the domain and client ID
   - create .auth0.env file in the root directory
   - source the file
   ```bash
   source .auth0.env
   ```
5. **Set up Entities**:
   ```bash
   jhipster jdl flickr2.jdl
   ```
6. start the application
   ```bash
   ./mvnw
   ```
7. **Register a user**:

   - Go to http://localhost:8080/register
   - Register a user

8. **Verify the user**:
   - Go to Auth0 managemant dashboard and verify the user

## License

This project is licensed under the MIT License.
