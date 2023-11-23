import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import Login from '../Login'
import SignUp from '../SignUp'
import { ILogin, ISignup, IUser } from '../types'
import Api from '../Api'

interface IHeaderProps {
  setToken: Function
  setUser: Function
  login: boolean
  setIslogin: Function
  user: IUser
  setTasks: Function
}

const Header = ({
  login,
  setToken,
  setIslogin,
  user,
  setUser,
  setTasks,
}: IHeaderProps) => {
  const [openLogin, setOpenLogin] = useState<boolean>(false)
  const [openSignup, setOpenSignup] = useState<boolean>(false)

  const handleLogin = (data: ILogin) => {
    Api.loginUser(data)
      .then((data: any) => {
        const storageData = JSON.stringify({ token: data.token })
        localStorage.setItem('task_app', storageData)

        if (data.token) {
          const { _id, name, email } = data.user
          setToken(data.token)
          setUser({ _id, name, email })
          setTasks(data.tasks)
          setIslogin(true)
          setOpenLogin(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSignup = (data: ISignup) => {
    data = { name: data.name, email: data.email, password: data.password }

    Api.signupUser(data)
      .then((data: any) => {
        const storageData = JSON.stringify({ token: data.token })
        localStorage.setItem('task_app', storageData)

        if (data.token) {
          const { _id, name, email } = data.user
          setToken(data.token)
          setUser({ _id, name, email })
          setTasks(data.tasks)
          setIslogin(true)
          setOpenSignup(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const setLogout = () => {
    localStorage.removeItem('task_app')
    setIslogin(false)
    setToken('')
  }

  return (
    <Box>
      {login ? (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '5%',
          }}
        >
          <Typography>{user.name}</Typography>
          <Button sx={{ textTransform: 'none' }} onClick={setLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            disableElevation={true}
            sx={{ backgroundColor: '#0696FF', textTransform: 'none' }}
            onClick={() => setOpenLogin(true)}
          >
            Login
          </Button>
          <Button
            variant="contained"
            disableElevation={true}
            sx={{ backgroundColor: '#0696FF', textTransform: 'none' }}
            onClick={() => setOpenSignup(true)}
          >
            Signup
          </Button>
        </Box>
      )}
      <Login
        open={openLogin}
        handleLogin={handleLogin}
        handleClose={() => setOpenLogin(false)}
      />
      <SignUp
        open={openSignup}
        handleSignUp={handleSignup}
        handleClose={() => setOpenSignup(false)}
      />
    </Box>
  )
}

export default Header
