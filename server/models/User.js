import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    pwd: { type: String, required: true },
    prenom: { type: String, required: false },
    nom: { type: String, required: false },
    dateNaissance: { type: Date, required: false },
}); 

export default mongoose.model('User', UserSchema);
