// Authentication System
const AuthManager = {
  // Initialize users array in localStorage if it doesn't exist
  init() {
    if (!localStorage.getItem("samsungUsers")) {
      // Create default admin user
      const defaultAdmin = {
        id: 1,
        username: "admin",
        password: "admin123",
        fullname: "Administrator",
        email: "admin@samsungstore.com",
        role: "admin",
      }

      localStorage.setItem("samsungUsers", JSON.stringify([defaultAdmin]))
    }
  },

  // Get all users
  getUsers() {
    return JSON.parse(localStorage.getItem("samsungUsers") || "[]")
  },

  // Save users to localStorage
  saveUsers(users) {
    localStorage.setItem("samsungUsers", JSON.stringify(users))
  },

  // Get current logged in user
  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("currentUser"))
  },

  // Login user
  login(username, password) {
    const users = this.getUsers()
    const user = users.find((u) => u.username === username && u.password === password)

    if (user) {
      // Store user info in sessionStorage (excluding password)
      const userInfo = {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      }
      sessionStorage.setItem("currentUser", JSON.stringify(userInfo))
      return { success: true, user: userInfo }
    }

    return { success: false, message: "Username atau password salah" }
  },

  // Register new user
  register(userData) {
    const users = this.getUsers()

    // Check if username already exists
    if (users.some((u) => u.username === userData.username)) {
      return { success: false, message: "Username sudah digunakan" }
    }

    // Check if email already exists
    if (users.some((u) => u.email === userData.email)) {
      return { success: false, message: "Email sudah digunakan" }
    }

    // Create new user
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      username: userData.username,
      password: userData.password,
      fullname: userData.fullname,
      email: userData.email,
      role: "user", // Default role for registered users
    }

    // Add user to array and save
    users.push(newUser)
    this.saveUsers(users)

    return { success: true }
  },

  // Logout user
  logout() {
    sessionStorage.removeItem("currentUser")
  },

  // Check if user is logged in
  isLoggedIn() {
    return !!this.getCurrentUser()
  },

  // Check if user is admin
  isAdmin() {
    const user = this.getCurrentUser()
    return user && user.role === "admin"
  },

  // Add user (for admin)
  addUser(userData) {
    const users = this.getUsers()

    // Check if username already exists
    if (users.some((u) => u.username === userData.username)) {
      return { success: false, message: "Username sudah digunakan" }
    }

    // Check if email already exists
    if (users.some((u) => u.email === userData.email)) {
      return { success: false, message: "Email sudah digunakan" }
    }

    // Create new user
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      username: userData.username,
      password: userData.password,
      fullname: userData.fullname,
      email: userData.email,
      role: userData.role || "user",
    }

    // Add user to array and save
    users.push(newUser)
    this.saveUsers(users)

    return { success: true, user: newUser }
  },

  // Update user (for admin)
  updateUser(userId, userData) {
    const users = this.getUsers()
    const index = users.findIndex((u) => u.id === userId)

    if (index === -1) {
      return { success: false, message: "Pengguna tidak ditemukan" }
    }

    // Check if username is already taken by another user
    if (users.some((u) => u.username === userData.username && u.id !== userId)) {
      return { success: false, message: "Username sudah digunakan" }
    }

    // Check if email is already taken by another user
    if (users.some((u) => u.email === userData.email && u.id !== userId)) {
      return { success: false, message: "Email sudah digunakan" }
    }

    // Update user
    users[index] = {
      ...users[index],
      username: userData.username,
      fullname: userData.fullname,
      email: userData.email,
      role: userData.role,
    }

    // Update password if provided
    if (userData.password) {
      users[index].password = userData.password
    }

    this.saveUsers(users)

    // Update current user in session if editing self
    const currentUser = this.getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...currentUser,
          username: userData.username,
          fullname: userData.fullname,
          email: userData.email,
          role: userData.role,
        }),
      )
    }

    return { success: true, user: users[index] }
  },

  // Delete user (for admin)
  deleteUser(userId) {
    const users = this.getUsers()
    const filteredUsers = users.filter((u) => u.id !== userId)

    if (filteredUsers.length === users.length) {
      return { success: false, message: "Pengguna tidak ditemukan" }
    }

    this.saveUsers(filteredUsers)
    return { success: true }
  },
}

// Initialize AuthManager
AuthManager.init()

// Handle login form
document.addEventListener("DOMContentLoaded", () => {
  // Toggle password visibility
  const togglePassword = document.getElementById("toggle-password")
  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      const passwordInput = document.getElementById("password")
      const icon = this.querySelector("i")

      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
      } else {
        passwordInput.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
      }
    })
  }

  // Login form submission
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const username = document.getElementById("username").value
      const password = document.getElementById("password").value
      const errorMessage = document.getElementById("error-message")

      const result = AuthManager.login(username, password)

      if (result.success) {
        // Redirect based on role
        if (result.user.role === "admin") {
          window.location.href = "admin.html"
        } else {
          window.location.href = "index.html"
        }
      } else {
        // Show error message
        errorMessage.textContent = result.message
        errorMessage.classList.remove("hidden")
      }
    })
  }

  // Registration form submission
  const registerForm = document.getElementById("register-form")
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const fullname = document.getElementById("fullname").value
      const username = document.getElementById("username").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value
      const errorMessage = document.getElementById("error-message")

      // Validate passwords match
      if (password !== confirmPassword) {
        errorMessage.textContent = "Password tidak cocok"
        errorMessage.classList.remove("hidden")
        return
      }

      const result = AuthManager.register({
        fullname,
        username,
        email,
        password,
      })

      if (result.success) {
        // Redirect to login page with success message
        alert("Registrasi berhasil! Silakan login.")
        window.location.href = "login.html"
      } else {
        // Show error message
        errorMessage.textContent = result.message
        errorMessage.classList.remove("hidden")
      }
    })
  }

  // Check if user is already logged in
  function checkAuth() {
    const currentUser = AuthManager.getCurrentUser()

    // If on admin page, check if user is admin
    if (window.location.pathname.includes("admin.html")) {
      if (!currentUser || currentUser.role !== "admin") {
        window.location.href = "login.html"
      }
    }
    // If on login or register page and already logged in, redirect to appropriate page
    else if (window.location.pathname.includes("login.html") || window.location.pathname.includes("register.html")) {
      if (currentUser) {
        if (currentUser.role === "admin") {
          window.location.href = "admin.html"
        } else {
          window.location.href = "index.html"
        }
      }
    }
  }

  // Check authentication status when page loads
  checkAuth()
})
