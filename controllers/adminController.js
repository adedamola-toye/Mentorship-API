import { saveUsersToFile, users } from "../data/users.js";

function promoteToMentor(req, res) {
  const userId = req.params.userId;
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const newRole = "mentor";
  
  if (user.role === newRole) {
    return res.status(400).json({ message: `User is already a ${newRole}` });
  }
  user.role = newRole;
  saveUsersToFile();

  const {hashedPassword, ...safeUser} = user;

  return res
    .status(200)
    .json({
      message: "User successfully promoted to a mentor role",
      user: safeUser,
    });
}

export default promoteToMentor