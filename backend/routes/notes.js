const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note"); // Importing Notes model
const { body, validationResult } = require("express-validator"); // Express validator
const { response } = require("express");

// ROUTE 1: Get all the notes using: GET '/api/notes/fetchAllNotes'. Login required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Add a new note using: POST '/api/notes/addNote'. Login required
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        user: req.user.id,
        title,
        description,
        tag,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Update an existing note using: POST '/api/notes/updateNote/:id'. Login required
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Create a newNote object
  const newNote = {};

  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // Find the note to be updated
  let note = await Note.findById(req.params.id);
  if (!note) return response.status(404).send("Not found");

  // If a logged in user want to access other user's note (Security check)
  if (note.user.toString() !== req.user.id) return response.status(404).send("Not allowed");

  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );

  res.json(note);
});

module.exports = router;
