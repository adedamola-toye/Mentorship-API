import bcrypt from 'bcryptjs'
function signup(req, res) {
  const { name, email, password } = req.body;

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

      const id = Date.now().toString();
      //Store user data with hashed password
      users.push({ id, name, email, hashedPassword, role: "user" });
      return res.status(201).json({ message: "User signed up successfully" });
    });
  
}

function signin(req, res) {
  const { email, password } = req.body;

  //Find user by email
  const existingUser = users.find((user) => user.email === email);
  if (!existingUser) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  //Compare the password inputted with the stored hashed password
    bcrypt.compare(password, existingUser.hashedPassword, (err, isMatch) => {
        if(err){
            return res.status(500).json({message:"Error comparing passwords"})
        }
        if(isMatch){
            return res.status(200).json({ message: "User signed in successfully" });
        }
        else{
            return res
      .status(401)
      .json({ message: "Error signing in. Password provided is incorrect" });
        }
    })

}

//module.exports =  {signup, signin};
export default {signup, signin}