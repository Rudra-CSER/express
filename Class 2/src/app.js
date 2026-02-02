// ============================================
// 1. SETUP & INITIALIZATION
// ============================================

const express = require("express");
const app = express();

// ============================================
// 2. MIDDLEWARE SETUP
// ============================================

// Middleware: express.json() 
// Purpose: Parses incoming JSON data from request body
// Without this, req.body would be undefined
// Example: When client sends {"title": "Note 1"}, this middleware makes it accessible via req.body
app.use(express.json());

// ============================================
// 3. DATA STORAGE (In-Memory)
// ============================================

// Temporary storage for notes (resets when server restarts)
// In a real app, you'd use a database instead
const notes = [];

// ============================================
// 4. CRUD OPERATIONS (Create, Read, Update, Delete)
// ============================================

// ------------------------------
// CREATE - POST /notes
// ------------------------------
// Purpose: Add a new note to the array
// Method: POST (used for creating new resources)
// Data Location: Request BODY (req.body)
// Body Example: { "title": "My Note", "Description": "This is a note" }
app.post("/notes", (req, res) => {
    console.log(req.body); // Log the incoming data
    notes.push(req.body);  // Add the new note to our array
    console.log(notes);    // Log all notes to see the updated array
    
    res.send("Note added successfully");
})

// ------------------------------
// READ - GET /notes
// ------------------------------
// Purpose: Retrieve all notes
// Method: GET (used for reading/fetching data)
// Returns: The entire notes array as JSON
app.get("/notes", (req, res) => {
    res.send(notes);
})

// ------------------------------
// DELETE - DELETE /notes/:id
// ------------------------------
// Purpose: Remove a note by its index
// Method: DELETE (used for deleting resources)
// URL Parameter: :id (the index of the note in the array)
// Data Location: Request PARAMS (req.params)
// Example URL: DELETE /notes/0 (deletes the first note)
// 
// 💡 TIP: Use PARAMS for single values in URL (like :id)
//         Use BODY for multiple values or complex data
app.delete("/notes/:id", (req, res) => {
    // req.params.id extracts the :id from the URL
    // Example: /notes/2 → req.params.id = "2"
    delete notes[req.params.id];
    
    res.send("Note deleted successfully");
})

// ------------------------------
// UPDATE - PATCH /notes/:index
// ------------------------------
// Purpose: Update an existing note's description
// Method: PATCH (used for partial updates)
// URL Parameter: :index (which note to update)
// Data Location: Request BODY (req.body) for new data
// Body Example: { "Description": "Updated description text" }
// 
// 💡 PATCH vs PUT:
//    PATCH = Partial update (only change some fields)
//    PUT = Complete replacement (replace entire resource)
app.patch("/notes/:index", (req, res) => {
    // Update only the Description field of the note at the given index
    notes[req.params.index].Description = req.body.Description;
    
    res.send("Note updated successfully");
})

// ============================================
// 5. EXPORT
// ============================================

// Export the app so server.js can use it
module.exports = app;