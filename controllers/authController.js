import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {users, saveUsersToFile, generateUserId} from '../data/users.js'

function signup(req, res) {
  const { firstName, lastName, email, password, address, bio, occupation } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !address ||
    !bio ||
    !occupation
  ) {
    return res.status(400).json({
      message:
        "User info not complete. Each user must have first name, last name, email, password, address, bio, and occupation.",
    });
  }

  //Check if user exists
  //const existingUser = users.find((user) => user.email === email)
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  //Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(501).json({ message: "Error hashing password" });
    }

    const id = generateUserId();
    //Store user data with hashed password
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
    saveUsersToFile();

    // generate token
    const token = jwt.sign(
      { userId: id, email, role: "user" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const { hashedPassword:_, ...safeUser} = newUser;
    return res.status(201).json({
      message: "User signed up successfully",
      data: { user: safeUser, token },
    });
  });
}

function signin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "You need both email and password to login" });
  }
  if(!email.includes("@")){
    return res.status(400).json({message:"Valid email needed"})
  }

  //Find user by email
  const existingUser = users.find((user) => user.email === email);
  if (!existingUser) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  //Compare the password inputted with the stored hashed password
  bcrypt.compare(password, existingUser.hashedPassword, (err, isMatch) => {
    if (err) {
      return res.status(500).json({ message: "Error comparing passwords" });
    }
    if (isMatch) {
      const token = jwt.sign(
        {
          userId: existingUser.id,
          email: existingUser.email,
          role: existingUser.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      return res
        .status(200)
        .json({ message: "User signed in successfully", data: token });
    } else {
      return res
        .status(401)
        .json({ message: "Error signing in. Password provided is incorrect" });
    }
  });
}

//module.exports =  {signup, signin};
export default { signup, signin };
