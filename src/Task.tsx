import React, { useState } from 'react'
import Login from './Login'
import { Box, Button, TextField, Typography } from '@mui/material'
import Card from './components/Card'
import Header from './components/Header'

const Task = () => {
  const [token, setToken] = useState<string>('')

  const handleLogin = () => {}

  const handleSignup = () => {}
  return (
    <div>
      <Header handleLogin={handleLogin} handleSignup={handleSignup} />
      <Box>
        <TextField variant="outlined" label={'Write your task'} />
      </Box>

      <Card />
    </div>
  )
}

export default Task
