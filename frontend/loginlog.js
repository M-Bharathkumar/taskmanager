document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent page reload on form submission

    // Get the input values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation: Ensure fields are not empty
    if (!email || !password) {
      document.getElementById("response").textContent =
        "Please enter both email and password.";
      document.getElementById("response").style.color = "red";
      return;
    }

    try {
      // Send POST request to the backend
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      //to save the token int the local storage
      localStorage.setItem("token", data.token);

      
      // Handle successful login
      if (response.ok) {
        document.getElementById("response").textContent = "Login successful!";
        document.getElementById("response").style.color = "green";

        // Optionally, redirect to another page (e.g., dashboard)
        setTimeout(() => {
          window.location.href = "./task.html"; // Adjust the URL as needed
        }, 1000);
      } else {
        // Display error message from the backend
        document.getElementById("response").textContent =
          data.message || "Invalid login credentials.";
        document.getElementById("response").style.color = "red";
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
      document.getElementById("response").textContent =
        "An error occurred. Please try again later.";
      document.getElementById("response").style.color = "red";
    }
  });
