import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AddNewTask from './components/AddNew'
import Card from './components/Card'
import Header from './components/Header'
import StatusButton from './components/StatusButton'
import { ITask, IUser } from './types'
import Api from './Api'
import img from './assets/no_task.svg'

const Task = () => {
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<IUser>({ _id: '', name: '', email: '' })
  const [tasks, setTasks] = useState([])
  const [isLogin, setIslogin] = useState<boolean>(false)
  const [status, setStatus] = useState<number>(0)
  const [loadingApp, setLoadingApp] = useState<boolean>(true)

  useEffect(() => {
    const storage = localStorage.getItem('task_app')
    if (!storage) return setLoadingApp(false)
    const user: any = JSON.parse(storage)
    if (user) {
      Api.synchronizeUser(user.token)
        .then((data: any) => {
          const storageData = JSON.stringify({ token: data.token })
          localStorage.setItem('task_app', storageData)

          if (data.token) {
            const { _id, name, email } = data.user
            setToken(data.token)
            setTasks(data.tasks)
            setUser({ _id, name, email })
            setIslogin(true)
            setLoadingApp(false)
          }
        })
        .catch((error: any) => {
          console.log(error)
          setLoadingApp(false)
        })
    }
  }, [])

  const setFilter = (status: number) => {
    Api.filterTasks(token, status)
      .then((data: any) => {
        setTasks(data.tasks)
        setStatus(status)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (loadingApp) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: '25%' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Header
        setToken={setToken}
        user={user}
        setUser={setUser}
        login={isLogin}
        setIslogin={setIslogin}
        setTasks={setTasks}
      />
      <Box sx={{ p: 10 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontSize: 22 }}>Your Tasks</Typography>
          {isLogin ? (
            <AddNewTask setTasks={setTasks} isLogin={isLogin} token={token} />
          ) : null}
        </Box>

        <Box sx={{ display: isLogin ? 'flex' : 'none', gap: 1 }}>
          <StatusButton
            isActive={status === 0}
            label="All"
            onPress={() => setFilter(0)}
          />
          <StatusButton
            isActive={status === 1}
            label="To Do"
            onPress={() => setFilter(1)}
          />
          <StatusButton
            isActive={status === 2}
            label="In Progress"
            onPress={() => setFilter(2)}
          />
          <StatusButton
            isActive={status === 3}
            label="Done"
            onPress={() => setFilter(3)}
          />
        </Box>
        <Box
          sx={{
            display: !isLogin || tasks.length === 0 ? 'flex' : 'none',
            justifyContent: 'center',
          }}
        >
          <img
            src={img}
            alt="No task"
            style={{
              width: '40%',
            }}
          />
        </Box>
        <Grid
          container
          spacing={5}
          sx={{ pt: 4, display: isLogin ? 'flex' : 'none' }}
        >
          {tasks
            ? tasks.map((task: ITask) => (
                <Grid key={task._id} item xs={10} sm={5} md={3}>
                  <Card
                    _id={task._id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    tasks={tasks}
                    setTasks={setTasks}
                    token={token}
                    mts={task.mts}
                  />
                </Grid>
              ))
            : null}
        </Grid>
      </Box>
    </>
  )
}

export default Task
