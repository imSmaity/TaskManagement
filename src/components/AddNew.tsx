import { Box, Button } from '@mui/material'
import { useState } from 'react'
import StatusButton from './StatusButton'
import TaskEdit from './TaskEdit'
import { ITask } from '../types'
import Api from '../Api'
import { AxiosError } from 'axios'

interface IAddNewTask {
  isLogin: boolean
  token: string
  setTasks: Function
}
const AddNewTask = ({ isLogin, token, setTasks }: IAddNewTask) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const setTask = (data: ITask) => {
    Api.createTask(token, data)
      .then((data: any) => {
        console.log(data)
        setOpenEdit(false)
        setTasks(data.tasks)
      })
      .catch((error: AxiosError) => {
        console.log(error)
      })
  }

  return (
    <>
      <Button
        variant="contained"
        disableElevation={true}
        sx={{
          borderRadius: 5,
          textTransform: 'none',
          padding: 1,
          fontSize: 16,
          width: '20%',
          backgroundColor: '#0696FF',
        }}
        onClick={() => setOpenEdit(true)}
      >
        Add new task
      </Button>
      <TaskEdit
        btn2Label="Add"
        handleTask={setTask}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
      />
    </>
  )
}

export default AddNewTask
