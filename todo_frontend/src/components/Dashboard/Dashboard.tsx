import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { NavLink } from "react-router-dom";
import SingleTodo from "./SingleTodo";
// import useFetchTodo from "../../hooks/useFetchTodo";
import { error } from "console";

interface CurrentUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

type SidebarProps = {
  currentUser?: CurrentUser; // Optional since it can be undefined initially
};

const Dashboard: React.FC<SidebarProps> = () => {
  const [currentDate, setCurrentDate] = useState({
    day: "",
    date: "",
    month: "",
  });
  const [greeting, setGreeting] = useState("");
  const [todo, setTodo] = useState();

  useEffect(() => {
    const updateDate = () => {
      const date: any = new Date();
      const hours: any = new Date().getHours();

      // For Greeting Functionality :
      if (hours < 12) {
        setGreeting("Good Morning");
      } else if (hours < 18) {
        setGreeting("Good Afternoon");
      } else if (hours < 22) {
        setGreeting("Good Night");
      } else {
        setGreeting("Good Evening");
      }

      // For Updatation Of Time :
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      setCurrentDate({
        day: days[date.getDay()],
        date: date.getDate(),
        month: months[date.getMonth()],
      });
    };

    updateDate(); // Initialize date immediately
    const timer = setInterval(updateDate, 1000 * 60); // Update every minute

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex flex-col p-8 dashboard-img text-white h-full mt-6 ">
      {/* Header Section */}
      <div className="mb-5 md:mx-auto md:ml-[16rem] sm:ml-[8rem] ">
        <h1 className="md:text-3xl text-md font-bold">{greeting},</h1>
        <p className="md:text-3xl text-md text-gray-300 mt-1 font-semibold">
          Today is your opportunity to build the tomorrow you want.
        </p>
      </div>

      {/* Date Card */}
      <div className="flex items-center justify-between p-4 bg-gray-900/60 rounded-lg mb-6 shadow-lg md:w-[60rem] w-[24rem] mx-auto md:text-xl ml-[-0.20rem] md:mx-auto">
        <div>
          <p className="text-md font-[750] text-white md:ml-5 ml-2 ">
            {currentDate.day}
          </p>
          <p className="text-[2.50rem] leading-[2.50rem] font-[900] text-white ml-4">
            {currentDate.date}
          </p>
          <p className="text-md text-white ml-[-0.15rem]">
            {currentDate.month}
          </p>
        </div>
        <div className="flex flex-col space-y-3">
          <p className="text-white font-medium">
            Join video meetings with one tap
          </p>
          <div className="flex space-x-2">
            <button className="bg-blue-600/70 md:px-3 px-1 py-1 md:text-sm text-[8px] rounded-full hover:bg-blue-500">
              Connect Google Calendar
            </button>
            <button className="bg-blue-600/70 md:px-3 px-1 py-1 md:text-sm text-[8px] rounded-full hover:bg-blue-500">
              Connect Outlook Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Task List Section */}
      <div className="space-y-4 flex-grow ">
        <SingleTodo />
      </div>

      {/* Add Task Button */}
      <AddTask />
    </div>
  );
};

export default Dashboard;
