
function getAllMentors(req,res){
    const mentors = users.filter((user)=> user.role === "mentor");
    if(mentors.length === 0){
        return res.status(404).json({message:"No mentors available"})
    }
    return res.status(200).json({mentors})
}

export default {getAllMentors}