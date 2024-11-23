import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UpdateTodoCard from "./components/UpdateTodoCard/UpdateTodoCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path={`/tasks/:id/activity`}
          element={<UpdateTodoCard />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
