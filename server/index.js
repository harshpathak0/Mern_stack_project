import express from "express";
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import AddModel from "./models/AddModel.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";


const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', "GET"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.static("Public"));

mongoose.connect("mongodb://127.0.0.1:27017/mern")
console.log(mongoose.connect)

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "Public/Images")
//     },
//     filename: (req, file ,cb)=> {
//         cb (null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer ({
//     storage: storage
// })

app.get("/getUsers", (req, res) => {
    AddModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.get("/getusersbyid/:id", (req, res) => {
    const id = req.params.id;
    AddModel.findById({ _id: id })
        .then(user => res.json(user))
        .catch(err => console.log(err))
})


app.put("/editform/:id", (req, res) => {
    const id = req.params.id;
    AddModel.findByIdAndUpdate(
        { _id: id },
        {
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            gender: req.body.gender,
            status: req.body.status,
            location: req.body.location
        })
        .then(result => res.json("Success"))
        .catch(err => res.json(err))

})


app.delete("deleteform/:id" , (req,res) => {
    AddModel.findOneAndDelete({_id: req.params.id})
    .then(result=> res.json("Success"))
    .catch(err => res.json(err))
})

app.post("/adddata", (req, res) => {
    const { name, email, number, gender, status, location } = req.body;

    if (!name || !email || !number || !gender || !status || !location) {
        return res.status(400).json({ error: "All fields are required" });
    }

    AddModel.create({ name, email, number, gender, status, location })
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: "Internal Server Error" }));
});



app.listen(8081, () => {
    console.log("Server is Running");
});


