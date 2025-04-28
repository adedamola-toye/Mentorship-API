import fs from "fs";
const filePath = "./data/sessions.json";

// Make sure the file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

// Load sessions from file
function loadSessionsFromFile() {
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData || "[]");
}

// Save sessions to file
function saveSessionsToFile(sessions) {
  fs.writeFileSync(filePath, JSON.stringify(sessions, null, 2), "utf-8");
}

// Generate next session ID based on current data in the file
function generateSessionId() {
  const sessions = loadSessionsFromFile();  // Load latest sessions data
  const nextSessionId = sessions.length > 0 ? sessions[sessions.length - 1].id + 1 : 1;
  return nextSessionId;
}

// Export functions
export { loadSessionsFromFile, saveSessionsToFile, generateSessionId };
