import fs from "fs";
const filePath = "./data/users.json";

// Make sure the file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

// Load users from file
function loadUsersFromFile() {
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData || "[]");
}

// Save users to file
function saveUsersToFile(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
}

// Generate next user ID based on current data in the file
function generateUserId() {
  const users = loadUsersFromFile();  // Load latest users data
  const nextUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  return nextUserId;
}

// Export functions
export { loadUsersFromFile, saveUsersToFile, generateUserId };
