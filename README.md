# 🍳 Recipe Share - A MERN Stack Application

Recipe Share is a dynamic and interactive web application built with the MERN stack. It's designed for food enthusiasts to discover, create, and manage their personal recipes. The application features a clean, user-friendly interface where visitors can browse existing recipes. By creating an account, users unlock the ability to contribute their own culinary creations and manage them seamlessly.

## ✨ Key Features

-   **Secure User Authentication:** Implements a robust registration and login system for managing user accounts.
-   **Public Recipe Feed:** The homepage displays all submitted recipes, making them accessible to every visitor.
-   **Full CRUD Functionality:** Authenticated users have complete control over their own content:
    -   **Create:** Add new recipes with a title, ingredients, and instructions.
    -   **Read:** View all their created recipes in a personalized dashboard.
    -   **Update:** Edit the details of their previously submitted recipes.
    -   **Delete:** Remove their recipes from the platform permanently.
-   **Responsive Design:** The interface is built to be fully responsive, ensuring a great user experience on desktops, tablets, and mobile devices.

## 🛠️ Technology Stack

-   **Frontend:** **React.js** (bootstrapped with **Vite** for a fast development experience).
-   **Backend:** A RESTful API built with **Node.js** and the **Express.js** framework.
-   **Database:** **MongoDB** (with Mongoose for object data modeling).
-   **Architecture:** The project follows the **MERN** (MongoDB, Express.js, React.js, Node.js) stack architecture.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have the following software installed on your machine:

-   [Node.js](https://nodejs.org/en/) (which includes npm)
-   [MongoDB](https://www.mongodb.com/try/download/community)

<!-- ### Installation -->

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install Backend Dependencies:**
    Navigate to the backend (or root, depending on your structure) folder and install the npm packages.
    ```bash
    # Example: cd server
    npm install
    ```

3.  **Install Frontend Dependencies:**
    Navigate to the frontend folder and install the npm packages.
    ```bash
    cd client
    npm install
    ```

4.  **Environment Variables:**
    Create a `.env` file in your backend/server directory. You will need to add your MongoDB connection string and a secret key for JWT (if you are using it).
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1.  **Start the Backend Server:**
    From the backend/server directory, run:
    ```bash
    npm start
    # Or if you have a dev script: npm run dev
    ```

2.  **Start the Frontend Development Server:**
    From the frontend/client directory, run:
    ```bash
    npm run dev
    ```

