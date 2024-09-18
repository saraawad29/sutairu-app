import Users from '../models/users.js'

// Création d'un nouvel utilisateur
const createUser = async (req, res, next) =>{
    const user = req.body; // Valeur entrée
    const newUser = new Users(user); 
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};



// // Affiche tous les utilisateurs
// const getAllUsers = async (req, res) => {
//     try {
//         const users = await Users.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// };

export default { createUser };
