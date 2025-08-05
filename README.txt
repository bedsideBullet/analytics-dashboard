# Business Intelligence Dashboard - Texas Trail Grills

A full-stack MERN (MongoDB, Express, React, Node.js) application built with TypeScript to serve as a dynamic, interactive dashboard for analyzing sales and marketing data for a fictional e-commerce company.

**Live Demo:** [Link to your deployed site will go here]

![Dashboard Screenshot](link-to-your-screenshot.png)

## Project Description

This project was built to simulate a real-world business intelligence tool. It features a complete backend API that serves data from a MongoDB database and a responsive, interactive frontend built with React and Chakra UI. The dashboard visualizes key performance indicators (KPIs) and provides insights into marketing channel effectiveness through data visualization with Recharts. This project showcases a full range of skills from backend architecture and database management to modern frontend development with TypeScript and data visualization.

## Features

* **Dynamic KPI Cards:** At-a-glance statistics for Total Revenue, Gross Profit, and Total Sales, calculated in real-time.
* **Interactive Bar Chart:** An interactive chart built with Recharts to visualize revenue by marketing channel.
* **Dynamic Data Reseeding:** A "Reseed Data" button that calls a custom API endpoint to repopulate the database with new, randomized data, demonstrating the dynamic nature of the application.
* **Light/Dark Mode Toggle:** A user-friendly theme switcher for a comfortable viewing experience, built with Chakra UI's color mode functionality.
* **Full-Stack Architecture:** A complete separation of concerns between the Express.js backend API and the React/Vite frontend.

## Tech Stack

* **Frontend:** React, TypeScript, Vite, Chakra UI (Component Library), Recharts (Charting)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose), hosted on MongoDB Atlas
* **Development Tools:** Git, GitHub, `dotenv` for environment management, Nodemon

## Getting Started

To run this project locally, you will need to perform the following steps:

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/analytics-dashboard.git](https://github.com/your-username/analytics-dashboard.git)
    ```
2.  Navigate to the root project directory:
    ```bash
    cd analytics-dashboard
    ```
3.  **Install Backend Dependencies:**
    ```bash
    cd server
    npm install
    ```
4.  **Install Frontend Dependencies:**
    ```bash
    cd ../client
    npm install
    ```
5.  **Setup Environment Variables:**
    * Create a `.env` file inside the `/server` directory.
    * Add your MongoDB Atlas connection string as `MONGO_URI`.
    * `MONGO_URI=your_connection_string`
6.  **Run the Application:**
    * You will need two terminals open.
    * In Terminal 1 (from the `/server` directory), run: `npx nodemon index.js`
    * In Terminal 2 (from the `/client` directory), run: `npm run dev`

## Future Improvements (Version 2.0)

* Integrate with the live Google Analytics 4 Data API to pull and visualize real-world e-commerce data.
* Implement date-range filters to allow users to analyze data for specific time periods.