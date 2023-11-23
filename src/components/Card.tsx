import {
  Button,
  Card,
  CardActions,
  CardContent,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import StatusButton from './StatusButton'
import TaskEdit from './TaskEdit'
import { ITask } from '../types'
import Api from '../Api'

interface ITaskCardProps extends ITask {
  tasks: ITask[]
  setTasks: Function
  token: string
  mts?: string
}
const TaskCard = ({
  _id,
  title,
  description,
  status,
  setTasks,
  token,
  mts,
}: ITaskCardProps) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const updateTask = (data: ITask) => {
    Api.updateTask(token, { ...data, task_id: data._id })
      .then((data: any) => {
        setTasks(data.tasks)
        setOpenEdit(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteTask = (_id: string) => {
    Api.deleteTask(token, _id)
      .then((data: any) => {
        setTasks(data.tasks)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Card variant="outlined" sx={cardStyle} onClick={() => setOpenEdit(true)}>
        <CardContent>
          <Typography sx={{ color: 'green' }}>
            {status === 1 ? 'TODO' : status === 2 ? 'IN PROGRESS' : 'DONE'}
          </Typography>
          <Typography>{title}</Typography>
          <Typography>{description}</Typography>
          <Typography sx={{ fontSize: 12, color: 'gray' }}>
            {new Date(String(mts)).toDateString()}
          </Typography>
        </CardContent>
        <CardActions>
          <StatusButton
            label={status === 3 ? 'Done' : 'Mark as done'}
            isActive={status === 3}
            onPress={(e: any) => {
              e.stopPropagation()
              if (status === 3) {
                updateTask({ _id, description, title, status: 1 })
              } else {
                updateTask({ _id, description, title, status: 3 })
              }
            }}
            style={{ textTransform: 'none' }}
          />
          <Button
            sx={{ textTransform: 'none', color: '#bbbbbb' }}
            onClick={(e: any) => {
              e.stopPropagation()
              deleteTask(String(_id))
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <TaskEdit
        taskOldData={{ _id, title, description, status }}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        btn2Label={'Update'}
        handleTask={updateTask}
      />
    </>
  )
}

const cardStyle: SxProps<Theme> = {
  padding: 1,
}

export default TaskCard
