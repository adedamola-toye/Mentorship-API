import {saveUsersToFile, loadUsersFromFile} from "../data/users.js"

function getAllMentors(req,res){
    const users = loadUsersFromFile()
    const mentors = users.filter((user)=> user.role === "mentor");
    if(mentors.length === 0){
        return res.status(404).json({message:"No mentors available"})
    }
    return res.status(200).json({mentors})
}


function getSpecificMentor(req, res) {
    const mentorId = parseInt(req.params.id); 
    const users = loadUsersFromFile()
    const mentor = users.find((user) => user.role === "mentor" && user.id === mentorId);
  
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
  
    return res.status(200).json({ mentor });
  }

  
  
export default {getAllMentors, getSpecificMentor}