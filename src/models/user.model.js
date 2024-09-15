import mongoose, {Schema} from "mongoose";


const userCollection = 'users';

const userSchema = new Schema({
    nombre: {
        type: String,
        require: true,
    },
    apellido: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    edad: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        default: 'user'
    }
})
  




export const UserModel = mongoose.model(userCollection, userSchema);
