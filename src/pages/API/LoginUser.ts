// api.ts

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${backendUrl}/logins/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailId: email, password: password }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok && data.success) {
      return {
        success: true,
        user: data.result.user?.role?.role || "Unknown Role", // Avoids errors if user/role is undefined
      };
    } else {
      return { success: false, message: data.message || "Invalid login credentials" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred. Please try again later." };
  }
};


