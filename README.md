# Password Manager 🔒

**Password Manager** is a secure mobile application designed to help users store and manage their passwords safely. Built with **React Native** and **Expo**, this app uses **Redux** for state management and provides a user-friendly interface with **React Navigation**.

## Features ✨

- **Secure Password Storage**: Store and manage your passwords securely.
- **Cross-platform Support**: Works on Android, iOS, and Web.
- **Easy Navigation**: User-friendly navigation with **React Navigation**.
- **Async Storage**: Data is stored locally using **AsyncStorage** for quick and secure access.
- **Responsive UI**: Designed with **React Native Paper** for a clean and modern look.

## Tech Stack ⚙️

- **React Native**: Framework for building cross-platform mobile applications.
- **Expo**: Toolset for faster development of React Native apps.
- **React Navigation**: For handling navigation between different screens.
- **Redux & Redux Toolkit**: For state management across the app.
- **Axios**: For making HTTP requests.
- **React Native Paper**: UI library for React Native components.
- **React Native Reanimated**: For smooth animations.
- **React Native Safe Area Context**: For handling safe areas on various devices.

## Installation 🚀

### Prerequisites

- **Node.js** (>= 16.x.x)
- **Expo CLI**: Install Expo globally using npm or yarn:
  ```bash
  npm install -g expo-cli
  ```

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/amliyanage/Encrypto-.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd PasswordManager
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the app**:
   You can run the app on different platforms:

   - **Android**:
     ```bash
     npm run android
     ```

   - **iOS**:
     ```bash
     npm run ios
     ```

   - **Web**:
     ```bash
     npm run web
     ```

   - **Start the app in general**:
     ```bash
     npm start
     ```

   This will launch Expo, and you can scan the QR code with the Expo Go app on your mobile device to see the app in action.

## Project Structure 📂

- **/assets**: Images and other static assets.
- **/components**: Reusable components for the UI.
- **/redux**: Redux store, slices, and reducers for state management.
- **/screens**: The main screens of the application.
- **/navigation**: Navigation-related files, including stack and tab navigators.
- **App.tsx**: Entry point of the app.

## Dependencies 🛠️

- **@expo-google-fonts/poppins**: Poppins font for better typography.
- **@react-native-async-storage/async-storage**: To store data locally on the device.
- **@react-navigation/native** & **@react-navigation/stack**: For handling the navigation between screens.
- **@reduxjs/toolkit**: For managing application state.
- **axios**: For handling HTTP requests.
- **expo-status-bar**: Status bar management for Expo apps.
- **react-native-paper**: UI library for consistent design.
- **react-native-reanimated**: For animations in React Native.
- **react-redux**: For connecting Redux state to React components.

## Development Setup 🔧

If you'd like to contribute or set up the development environment, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/amliyanage/Encrypto-.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the app on your preferred platform (Android, iOS, Web).

### Development Commands

- **Run on Android**:
  ```bash
  npm run android
  ```

- **Run on iOS**:
  ```bash
  npm run ios
  ```

- **Run on Web**:
  ```bash
  npm run web
  ```

# Encrypto Server 🔐

Welcome to **Encrypto Server**! This is the backend server for the **Encrypto** application, which handles encryption and decryption of sensitive data. It uses modern encryption techniques to ensure that your data is securely processed and stored.

## Overview 🛠️

**Encrypto Server** provides a backend API for encrypting and decrypting sensitive information. Built using **Node.js**, **Express**, and **Prisma**, this server allows you to integrate encryption capabilities into your application easily.

### Features

- **Encryption**: Securely encrypt sensitive data using AES and other cryptographic algorithms.
- **Decryption**: Easily decrypt data when required.
- **JWT Authentication**: Secure API endpoints with JSON Web Tokens (JWT).
- **Database Integration**: Store encrypted data securely in a MySQL database using Prisma.
- **Dev Environment**: Supports live-reload during development with **nodemon**.

## Tech Stack ⚙️

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for creating RESTful APIs.
- **Prisma**: ORM for working with MySQL databases.
- **bcryptjs & bcrypt**: For securely hashing passwords.
- **jsonwebtoken**: For managing authentication with JWT.
- **dotenv**: For environment variable management.
- **MySQL2**: MySQL database connector for Node.js.

## Installation 🚀

Follow these steps to set up the Encrypto Server on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/amliyanage/Encrypto-server.git
   ```

2. **Navigate to the project folder:**
   ```bash
   cd Encrypto-server
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   - Copy `.env.example` to `.env`.
   - Set up your database connection and other sensitive environment variables in the `.env` file.

5. **Run the server:**
   For development mode with automatic reloading:
   ```bash
   npm run dev
   ```
   The server should now be running on `http://localhost:3000`.

## Scripts 📜

- **Development Mode**:  
  `npm run dev`  
  Starts the server with live reloading using **nodemon**. Changes to your code will automatically restart the server.
  
- **Test**:  
  `npm test`  
  A placeholder command for running tests (currently, no tests are defined).

## Dependencies 🛠️

The project includes the following dependencies:

- **@prisma/client**: Prisma client for working with the database.
- **bcrypt** & **bcryptjs**: Libraries for hashing passwords securely.
- **cors**: Middleware for enabling cross-origin requests.
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Framework for building the REST API.
- **jsonwebtoken**: For handling JWT authentication.
- **mysql2**: MySQL client for database connections.

### Development Dependencies

- **@types/***: TypeScript type definitions for various libraries.
- **nodemon**: Utility for automatically restarting the server during development.
- **prisma**: Prisma ORM for interacting with MySQL databases.
- **ts-node** & **typescript**: TypeScript runtime and compiler.

## Database Configuration 🗃️

1. **Prisma Setup**:  
   Prisma is used to interact with the MySQL database. To generate the Prisma client, run:
   ```bash
   npx prisma generate
   ```

2. **Migrate Database**:  
   Run the Prisma migrations to set up your database schema:
   ```bash
   npx prisma migrate dev
   ```

3. **Database Connection**:  
   Set up your MySQL database connection string in the `.env` file:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/database_name"
   ```


