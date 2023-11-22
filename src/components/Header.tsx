import { Box, Button } from '@mui/material'
import { useState } from 'react'
import Login from '../Login'

interface IHeaderProps {
  handleLogin: () => void
  handleSignup: () => void
}

const Header = ({ handleLogin }: IHeaderProps) => {
  const [openLogin, setOpenLogin] = useState<boolean>(false)

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpenLogin(true)}>
        Login
      </Button>
      <Login
        open={openLogin}
        handleLogin={handleLogin}
        handleClose={() => setOpenLogin(false)}
      />
    </Box>
  )
}

export default Header
