import { useState } from 'react'
import axios from 'axios'

//imstall axios -> npm i axios for making api calls

function App() {

  const [Notes, setNotes] = useState([
    {
      // this is dummy data, we will replace it with data from backend using axios.get
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


//declare aixox.get to fetch data from backend and set it to state variable Notes
axios.get("http://localhost:3000/notes").then((res) => {
//  console.log(res.data);
 setNotes(res.data.Notes)
 
})
  return (
    <>
  {/* use map function that will allow the element to be rendered multiple times */}
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
