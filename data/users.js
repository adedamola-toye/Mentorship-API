import fs from "fs";
const filePath = "./data/users.json";

// Load users from file when app starts
let users = [];
if (fs.existsSync(filePath)) {
  const fileData = fs.readFileSync(filePath, "utf-8");
  users = JSON.parse(fileData || "[]");
}

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
  }

let nextUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
function generateUserId(){
    return nextUserId++;
}
  

// Save users to file
function saveUsersToFile() {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
}

// Export both the users array and the save function
export { users, generateUserId, saveUsersToFile };
