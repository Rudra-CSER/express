import { useState } from 'react'
import axios from 'axios'



function App() {
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



axios.get("http://localhost:3000/notes").then((res) => {
//  console.log(res.data);
 setNotes(res.data.Notes)
 
})
  return (
    <>
 <div className="notes">
  {Notes.map((Note) => {
        return <div className="note">
      <h2>{Note.title}</h2>
      <p>{Note.Description}</p>
    </div>
  })}
 </div>
      </>
  )
}

export default App
