const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const UserModel = require("./models/UserModels")

mongoose.connect("mongodb://localhost:27017/dimi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.json())
app.use(cors())

app.get("/getdes", async (req, res) => {
  try {
    const des = await UserModel.find()
    res.json(des)
  } catch (err) {
    res.status(500).json({
      Error: "Internal Server Error",
      err,
    })
  }
})

app.post("/create", async (req, res) => {
  try {
    const { des } = req.body

    if (!des) {
      return res.status(400).json("Error: 'des' field is required")
    }

    const saveChange = new UserModel({
      des,
    })

    await saveChange.save()
    res.status(201).json({ message: "Data saved successfully", saveChange })
  } catch (er) {
    res.status(500).json({
      Er: er,
    })
  }
})

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params
    await UserModel.findByIdAndDelete(id)
    return res.status(200).json("Deleted Successfully")
  } catch (error) {
    return res.status(500).json(error)
  }
})


app.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { des } = req.body

    if (!des) {
      return res.status(400).json("Error: 'des' field is required")
    }

    const updatedDocument = await UserModel.findByIdAndUpdate(
      id,
      { des },
      { new: true } 
    )

    if (!updatedDocument) {
      return res.status(404).json("Document not found")
    }

    res.status(200).json({ message: "Data updated successfully", updatedDocument })
  } catch (error) {
    res.status(500).json(error)
  }
})

app.listen(3000, () => {
  console.log("Running")
})
