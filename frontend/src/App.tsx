import './App.css'
import { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then((res) => {
        res.json()
        .then((data) => {
          console.log(data)
          setData(data.status)
        }).catch((err) => {
          console.log(err)
        })
      })
  }, []);


  return (
    <div>
      <h1>CareFlow APP</h1>
      <p>backend status : {data}</p>
    </div>
  )
}

export default App
