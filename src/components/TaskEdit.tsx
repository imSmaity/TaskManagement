import { Box, Button, Modal, SxProps, TextField, Theme } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import StatusButton from './StatusButton'
import { ITask } from '../types'

interface ITaskEditProps {
  openEdit: boolean
  setOpenEdit: (open: boolean) => void
  btn2Label: string
  handleTask: (data: ITask) => void
  taskOldData?: ITask
}

const TaskEdit = ({
  openEdit,
  setOpenEdit,
  btn2Label,
  handleTask,
  taskOldData,
}: ITaskEditProps) => {
  const [task, setTask] = useState<ITask>({
    _id: '',
    title: '',
    description: '',
    status: 1,
    ...taskOldData,
  })

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  return (
    <Modal
      open={openEdit}
      onClose={setOpenEdit}
      aria-labelledby="modal-card-modal-title"
      aria-describedby="modal-card-modal-description"
    >
      <Box sx={style}>
        <TextField
          id="filled-basic"
          label="Title"
          name="title"
          variant="outlined"
          value={task.title}
          onChange={handleInput}
        />
        <TextField
          id="filled-basic"
          multiline={true}
          minRows={3}
          maxRows={3}
          value={task.description}
          name={'description'}
          label="Description"
          variant="outlined"
          onChange={handleInput}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <StatusButton
            isActive={task.status === 1}
            label="To Do"
            onPress={() => setTask({ ...task, status: 1 })}
          />
          <StatusButton
            isActive={task.status === 2}
            label="In Progress"
            onPress={() => setTask({ ...task, status: 2 })}
          />
          <StatusButton
            isActive={task.status === 3}
            label="Done"
            onPress={() => setTask({ ...task, status: 3 })}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2, gap: 2 }}>
          <Button
            variant="contained"
            disableElevation={true}
            sx={{
              p: 1,
              width: 100,
              backgroundColor: '#0696FF',
              textTransform: 'none',
            }}
            onClick={() => {
              setOpenEdit(false)
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation={true}
            sx={{
              p: 1,
              width: 100,
              backgroundColor: '#0696FF',
              textTransform: 'none',
            }}
            onClick={() => handleTask(task)}
          >
            {btn2Label}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

const style: SxProps<Theme> = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default TaskEdit
