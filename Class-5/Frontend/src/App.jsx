import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [Notes, setNotes] = useState([
    {
      title: "test",
      Description: "DESCRIPTION"
    },{
      title: "test",
      Description: "DESCRIPTION"
    },{
      title: "test",
      Description: "DESCRIPTION"
    },{
      title: "test",
      Description: "DESCRIPTION" 
    }
  ])

//CREATE A FUNTION FOR AXIOS GET REQUEST TO FETCH DATA FROM BACKEND THEN CALL IT TO USEEFFECT

function getNotes() {
  //declare aixox.get to fetch data from backend and set it to state variable Notes
  axios.get("https://vivid-notesai.onrender.com/notes").then((res) => {
    //  console.log(res.data);
   setNotes(res.data.Notes)
  })
  }



  function formhandel(e) {e.preventDefault()
         const {title, Description} = e.target.elements
         console.log(title.value,Description.value);
//we have to make an axios post request to send data to backend
         axios.post("https://vivid-notesai.onrender.com/notes", {
           title: title.value,
           Description: Description.value
         }).then((res)=>{
           console.log(res.data);
           getNotes() // after creating a note we have to fetch the updated list of notes from backend to update the UI
           
         })
  }
function deleteNote(noteid) {
      
     console.log(noteid)

    axios.delete("https://vivid-notesai.onrender.com/notes/" + noteid).then((res) => {
      console.log(res.data);
      getNotes() // after deleting a note we have to fetch the updated list of notes from backend to update the UI
    })
  }

function updateNote(e) {
  e.preventDefault()
  const { id, title, Description } = e.target.elements
  const idValue = id.value
  // console.log(idValue, title.value, Description.value)

  // If the user typed a number like "0" or "5", use it as an index into Notes.
  // Otherwise treat the input as the actual note _id.
  let noteId = idValue
  const idx = parseInt(idValue, 10)
  //actual mongo _id is a string, so if the input can be parsed as a number and is a valid index in the Notes array, we will use the _id of the note at that index.
  noteId = Notes[idx]._id

  // send patch to backend for the resolved noteId
  axios.patch(`https://vivid-notesai.onrender.com/notes/${noteId}`, {
    title: title.value,
    Description: Description.value,
  })
    .then((res) => {
      console.log(res.data)
      getNotes()
    })
}


//we have to use useEffect to call the api when the component mounts, otherwise it will cause an infinite loop of re-rendering

useEffect(() => {
  getNotes()
  // Hide intro after 1.8s to show content
  const timer = setTimeout(() => setShowIntro(false), 1800)
  return () => clearTimeout(timer)
}, [])


  return (
    <div className="app">
      {showIntro && (
        <div className="splash-intro">
          <h1>Vivid Notes</h1>
        </div>
      )}

      <div className="content-fade">
        <header className="header">
          <h1>Vivid Notes</h1>
          <p>Bright, playful and snappy — create notes that pop.</p>
        </header>

        <div className="controls">
          <form className='note-create-from' onSubmit={formhandel}>
            <input  name="title" type="text" placeholder='Title' />
            <input name="Description" type="text" placeholder='Description' />
            <button className="btn primary" type='submit'>Create</button>
          </form>

          <form className="notes-upadte-form" onSubmit={updateNote}> 
            <input name="id" type="text" placeholder='Index or ID' />
            <input name="title" type="text" placeholder='Title' />
            <input name="Description" type="text" placeholder='Description' />
            <button className="btn secondary" type='submit'>Update</button>
          </form>
        </div>

        <div className="notes">
          {Notes.map((notes) => {
            const dotIdx = (Math.abs((notes.title || '').length) % 3) + 1
            return (
              <div className="note" key={notes._id}>
                <h2>{notes.title}</h2>
                <p>{notes.Description}</p>
                <div className="meta">
                  <span className={`dot dot--c${dotIdx}`}></span>
                  <div style={{flex:1}}></div>
                  <button className="btn danger" onClick={() => deleteNote(notes._id)}>Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
