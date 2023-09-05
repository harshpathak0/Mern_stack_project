import mongoose from "mongoose";


const addSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, 
    },
    number: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
});

const AddModel = mongoose.model("adddata", addSchema);

export default AddModel;
