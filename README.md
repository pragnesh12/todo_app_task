# Simple Todo Application

This is a simple Todo application built with modern web technologies. It allows you to add, update, delete, and manage tasks. The project uses the following technologies:

- **Frontend**: ReactJS, TypeScript
- **Backend**: NodeJS, ExpressJS
- **Database**: MongoDB
- **Security**: TypeScript for type safety and enhanced security

## Features

- Add, update, and delete tasks
- Store tasks in MongoDB
- Built with a clean and simple UI using ReactJS
- Backend powered by ExpressJS for handling API requests
- Security features using TypeScript for type safety

---

## Getting Started

Follow the steps below to set up the project on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/pragnesh12/todo_app_task.git
cd your-todo-project
```

### 2. Frontend Setup
Navigate to the todo_frontend folder:
```bash
cd todo_frontend
```
Install the required npm packages:
```bash
npm install
```
Start the frontend server:
```bash 
npm start
```


### 3. Backend Setup
Navigate to the todo_backend folder:
```bash
cd todo_backend
```

## Create a .env file in the todo_backend folder and add the following environment variables:
makefile
```bash
MONGODB_URL=<Your MongoDB Connection URL>
PORT=1156
CORS_ORIGIN=*
```
Ensure that your MongoDB URL is correct and working. You can use MongoDB Compass to connect to your database.

Install the required npm packages:
```bash
npm install
```
Start the backend server:
```bash
npm start  
```
# The backend will be available on http://localhost:1156.

### 4. Running the Application
1. The frontend will be running on port 3000.
2. The backend will be running on port 1156.
Once everything is set up and running, you can open your browser and navigate to http://localhost:3000 to see the Todo application in action!

### Conclusion
This is a simple yet effective Todo application that allows users to manage their tasks. Built with ReactJS, NodeJS, ExpressJS, and MongoDB, it provides a great foundation for building more complex applications in the future.


### Key Points:
1. **Tech Stack**: Lists the technologies used in the project.
2. **Instructions**: Clear steps to set up both frontend and backend, including npm commands and environment variables.
3. **Port Information**: Specifies that the frontend runs on port 3000 and the backend on port 1156.
4. **MongoDB Setup**: Emphasizes the need to configure MongoDB properly, suggesting MongoDB Compass for easier management.
5. **Running the Application**: Instructions on how to run both parts of the application.
6. **Screenshot**: Placeholder for a screenshot of the app, if available.

This should give anyone who reads the README a complete understanding of how to set up and run your project.

