import fs from "fs";
const filePath = "./data/sessions.json";

// Load sessions from file when app starts
let sessions = [];
if (fs.existsSync(filePath)) {
  const fileData = fs.readFileSync(filePath, "utf-8");
  sessions = JSON.parse(fileData || "[]");
}

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
  }

let nextSessionId = sessions.length > 0 ? sessions[sessions.length - 1].id + 1 : 1;
function generateSessionId(){
    return nextSessionId++;
}
// Save sessions to file
function saveSessionsToFile() {
  fs.writeFileSync(filePath, JSON.stringify(sessions, null, 2), "utf-8");
}

// Export both the sessions array and the save function
export { sessions, generateSessionId, saveSessionsToFile };
