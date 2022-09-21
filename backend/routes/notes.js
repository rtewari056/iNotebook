const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");
const Note = require("../models/Note"); // Importing Notes model
const { body, validationResult } = require("express-validator"); // Express validator

// ROUTE 1: Get all the notes using: GET '/api/notes/fetchAllNotes'. Login required
router.get("/fetchAllNotes", authenticateUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.id }).exec();

    if (!notes) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        notes: [], // Send empty array if notes not found
        message: "No Data Found",
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      notes,
      message: "Data sent successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
});

// ROUTE 2: Add a new note using: POST '/api/notes/addNote'. Login required
router.post(
  "/addNote",
  authenticateUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // If there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: errors.array()[0].msg,
          errors: errors.array(),
        });
      }

      const { title, description, tag } = req.body; // Destructuring from incoming request

      const savedNote = await Note.create({
        user: req.id, // To notes with logged in user id
        title,
        description,
        tag,
      });

      return res.status(200).json({
        success: true,
        statusCode: 200,
        savedNote, // Sending recently saved note
        message: "Note saved successfully!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Internal server error",
        error,
      });
    }
  }
);

// ROUTE 3: Update an existing note using: PUT '/api/notes/updateNote/:id'. Login required
router.put("/updateNote/:id", authenticateUser, async (req, res) => {
  try {
    // Find the note to be updated
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(409).json({
        success: false,
        statusCode: 409,
        message: "Sorry! Note does not exist",
      });
    }

    // If a logged in user want to access other user's note (Important Security check)
    if (note.user.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Not allowed",
      });
    }

    // Finally update note
    await Note.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
});

// ROUTE 4: Delete an existing note using: DELETE '/api/notes/deleteNote/:id'. Login required
router.delete("/deleteNote/:id", authenticateUser, async (req, res) => {
  try {
    // Find the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(409).json({
        success: false,
        statusCode: 409,
        message: "Sorry! Note does not exist",
      });
    }

    // Allow deletion only if user owns this note (Important Security check)
    if (note.user.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Not allowed",
      });
    }

    // Finally delete the note
    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
});

module.exports = router;
