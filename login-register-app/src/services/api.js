// src/api.js

// Helper function to handle API requests
const apiRequest = async (url, payload) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An error occurred.");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Something went wrong.");
  }
};

// Login user
export const loginUser = (payload) => {
  return apiRequest("http://localhost:5000/api/login", payload);
};

// Register user
export const registerUser = (payload) => {
  return apiRequest("http://localhost:5000/api/register", payload);
};

export const verifyToken = (token)  => {
  return apiRequest("http://localhost:5000/api/verify-token",{token})
}


