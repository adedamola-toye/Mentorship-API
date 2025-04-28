import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {saveUsersToFile, generateUserId, loadUsersFromFile} from '../data/users.js'


async function signup(req, res) {
  try {
    const { firstName, lastName, email, password, address, bio, occupation } = req.body;

    if (!firstName || !lastName || !email || !password || !address || !bio || !occupation) {
      return res.status(400).json({
        message: "User info not complete. Each user must have first name, last name, email, password, address, bio, and occupation.",
      });
    }

    const users = loadUsersFromFile();

    //const userExists = users.find((user) => user.email === email);
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password with await
    const hashedPassword = await bcrypt.hash(password, 10);

    const id = generateUserId();
    const newUser = {
      id,
      firstName,
      lastName,
      email,
      hashedPassword,
      address,
      bio,
      occupation,
      role: "user",
    };

    users.push(newUser);
    saveUsersToFile(users);

    // Generate token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: "user" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    const { hashedPassword: _, ...safeUser } = newUser;
    return res.status(201).json({
      message: "User signed up successfully",
      data: { user: safeUser, token },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong during signup" });
  }
}

async function signin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "You need both email and password to login" });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Valid email needed" });
    }

    const users = loadUsersFromFile()

    const existingUser = users.find((user) => user.email === email);
    if (!existingUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    // Compare passwords with await
    const isMatch = await bcrypt.compare(password, existingUser.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "User signed in successfully", token: token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong during signin" });
  }
}

//module.exports =  {signup, signin};
export default { signup, signin };
