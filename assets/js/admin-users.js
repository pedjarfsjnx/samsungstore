// Admin User Management
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is admin
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
  if (!currentUser || currentUser.role !== "admin") {
    window.location.href = "login.html"
    return
  }

  // Load user management section
  const userManagementSection = document.getElementById("users")
  if (userManagementSection) {
    loadUserManagement()
  }
})

function loadUserManagement() {
  const userManagementSection = document.getElementById("users")

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("samsungUsers") || "[]")

  // Create user table
  let tableHTML = `
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Kelola Pengguna</h2>
          <button id="addUserBtn" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <i class="fas fa-plus mr-2"></i>Tambah Pengguna
          </button>
        </div>
      </div>
      <div id="user-form-container" class="p-6 border-b hidden">
        <h3 id="form-title" class="text-lg font-semibold mb-4">Tambah Pengguna Baru</h3>
        <form id="user-form" class="space-y-4">
          <input type="hidden" id="user-id">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input type="text" id="user-fullname" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" id="user-username" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="user-email" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" id="user-password" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select id="user-role" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" id="cancel-user-btn" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Simpan</button>
          </div>
        </form>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Lengkap</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody id="usersTable" class="divide-y divide-gray-200">
  `

  // Add users to table
  users.forEach((user) => {
    tableHTML += `
      <tr>
        <td class="px-6 py-4 whitespace-nowrap">${user.id}</td>
        <td class="px-6 py-4 whitespace-nowrap">${user.fullname}</td>
        <td class="px-6 py-4 whitespace-nowrap">${user.username}</td>
        <td class="px-6 py-4 whitespace-nowrap">${user.email}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="px-2 py-1 text-xs font-medium ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"} rounded-full">
            ${user.role}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex space-x-2">
            <button onclick="editUser(${user.id})" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-edit"></i>
            </button>
            <button onclick="deleteUser(${user.id})" class="text-red-600 hover:text-red-800">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `
  })

  tableHTML += `
          </tbody>
        </table>
      </div>
    </div>
  `

  userManagementSection.innerHTML = tableHTML

  // Add event listeners
  document.getElementById("addUserBtn").addEventListener("click", showAddUserForm)
  document.getElementById("cancel-user-btn").addEventListener("click", hideUserForm)
  document.getElementById("user-form").addEventListener("submit", handleUserFormSubmit)
}

function showAddUserForm() {
  document.getElementById("form-title").textContent = "Tambah Pengguna Baru"
  document.getElementById("user-id").value = ""
  document.getElementById("user-form").reset()
  document.getElementById("user-form-container").classList.remove("hidden")
}

function hideUserForm() {
  document.getElementById("user-form-container").classList.add("hidden")
}

function editUser(userId) {
  const users = JSON.parse(localStorage.getItem("samsungUsers") || "[]")
  const user = users.find((u) => u.id === userId)

  if (user) {
    document.getElementById("form-title").textContent = "Edit Pengguna"
    document.getElementById("user-id").value = user.id
    document.getElementById("user-fullname").value = user.fullname
    document.getElementById("user-username").value = user.username
    document.getElementById("user-email").value = user.email
    document.getElementById("user-password").value = user.password
    document.getElementById("user-role").value = user.role
    document.getElementById("user-form-container").classList.remove("hidden")
  }
}

function deleteUser(userId) {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))

  // Prevent deleting yourself
  if (currentUser.id === userId) {
    alert("Anda tidak dapat menghapus akun Anda sendiri!")
    return
  }

  if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
    const users = JSON.parse(localStorage.getItem("samsungUsers") || "[]")
    const updatedUsers = users.filter((u) => u.id !== userId)
    localStorage.setItem("samsungUsers", JSON.stringify(updatedUsers))
    loadUserManagement()
  }
}

function handleUserFormSubmit(e) {
  e.preventDefault()

  const userId = document.getElementById("user-id").value
  const fullname = document.getElementById("user-fullname").value
  const username = document.getElementById("user-username").value
  const email = document.getElementById("user-email").value
  const password = document.getElementById("user-password").value
  const role = document.getElementById("user-role").value

  const users = JSON.parse(localStorage.getItem("samsungUsers") || "[]")

  if (userId) {
    // Update existing user
    const userIndex = users.findIndex((u) => u.id === Number.parseInt(userId))

    if (userIndex !== -1) {
      // Check if username is already taken by another user
      if (users.some((u) => u.username === username && u.id !== Number.parseInt(userId))) {
        alert("Username sudah digunakan oleh pengguna lain")
        return
      }

      // Check if email is already taken by another user
      if (users.some((u) => u.email === email && u.id !== Number.parseInt(userId))) {
        alert("Email sudah digunakan oleh pengguna lain")
        return
      }

      users[userIndex] = {
        ...users[userIndex],
        fullname,
        username,
        email,
        password,
        role,
      }

      // Update current user in session if editing self
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
      if (currentUser && currentUser.id === Number.parseInt(userId)) {
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({
            ...currentUser,
            fullname,
            username,
            email,
            role,
          }),
        )
      }
    }
  } else {
    // Create new user
    // Check if username already exists
    if (users.some((u) => u.username === username)) {
      alert("Username sudah digunakan")
      return
    }

    // Check if email already exists
    if (users.some((u) => u.email === email)) {
      alert("Email sudah digunakan")
      return
    }

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      fullname,
      username,
      email,
      password,
      role,
    }

    users.push(newUser)
  }

  localStorage.setItem("samsungUsers", JSON.stringify(users))
  hideUserForm()
  loadUserManagement()
  alert(userId ? "Pengguna berhasil diperbarui!" : "Pengguna baru berhasil ditambahkan!")
}

// Make functions globally available
window.editUser = editUser
window.deleteUser = deleteUser
