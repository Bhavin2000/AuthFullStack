import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setIsAuthenticated }) => {

  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUsername(parsedData.username); // Set the username from the stored data
    } else {
      // If no data found in localStorage, redirect to login page
      navigate("/login");
    }
  }, [navigate]); 


  const handleLogout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    // Set isAuthenticated to false
    setIsAuthenticated(false); 

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, you are logged in! {username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
