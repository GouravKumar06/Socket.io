import React, { useEffect, useMemo, useState } from 'react'
import {io} from 'socket.io-client'
import { Container, TextField, Typography, Button } from '@mui/material'
const App = () => {
  const [message, setMessage] = useState('')

  const socket = useMemo( () => io('http://localhost:5000'),[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', message);
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected",socket.id)
    })

    socket.on('welcome', (msg) => {
      console.log(msg)
    })

    socket.on("receive-message", (data) => {
      console.log(data)
    })

    return () => { 
      socket.disconnect()
    }
  },[])
  return (
    <Container>
      <Typography variant='h1' component='div'>
        Welcome to Socket.io
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField onChange={(e) => setMessage(e.target.value)} value={message} id="outlined-basic" label="Outlined" variant="outlined" />
        <Button type="submit" variant="contained" color="primary">Send</Button>
      </form>
    </Container>
  )
}

export default App  
