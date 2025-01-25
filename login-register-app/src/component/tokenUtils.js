// tokenUtils.js

// Function to save the token to localStorage
export const saveToken = (token) => {
    localStorage.setItem("token", token);
  };
  
  // Function to retrieve the token from localStorage
  export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  // Function to remove the token from localStorage
  export const removeToken = () => {
    localStorage.removeItem("token");
  };
  