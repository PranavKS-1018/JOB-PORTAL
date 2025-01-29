export const login = async (email, password, userType) => {
    try {
      const response = await fetch("https://localhost:7095/api/Authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      });
  
      const responseText = await response.text();
      try {
        return JSON.parse(responseText);
      } catch (e) {
        return { message: responseText, success: false };
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  
  
  export const register = async (name, age, phone, email, password, userType) => {
    try {
      const response = await fetch("https://localhost:7095/api/Authentication/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, phone, email, password, userType }),
      });
  
      const responseText = await response.text();
      try {
        // Try to parse as JSON
        return JSON.parse(responseText);
      } catch (e) {
        // If parsing fails, return as a JSON object with a generic message
        return { message: responseText, success: false };
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return { message: 'Failed to register. Please try again later.', success: false };
    }
  };
  
  