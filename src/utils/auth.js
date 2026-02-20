// Save new user
export const registerUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Prevent duplicate email
  const existingUser = users.find((u) => u.email === user.email);
  if (existingUser) {
    return { success: false, message: "Email already registered" };
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  return { success: true };
};

// Login user
export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true, user };
  }

  return { success: false, message: "Invalid email or password" };
};

// Get logged in user
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};
// Add a message for current user
export const addMessage = (message) => {
  const user = getCurrentUser();
  if (!user) return;

  const messages = JSON.parse(localStorage.getItem(`messages_${user.email}`)) || [];

  messages.push({
    id: Date.now(),
    title: message.title,
    content: message.content,
    date: new Date().toLocaleDateString(),
  });

  localStorage.setItem(`messages_${user.email}`, JSON.stringify(messages));
};

// Get messages for current user
export const getMessages = () => {
  const user = getCurrentUser();
  if (!user) return [];
  return JSON.parse(localStorage.getItem(`messages_${user.email}`)) || [];
};
