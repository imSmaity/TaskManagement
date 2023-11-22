import {
  Card,
  Button,
  SxProps,
  Theme,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material'
import React from 'react'

const TaskCard = () => {
  return (
    <Card variant="outlined" sx={cardStyle}>
      <CardContent>
        <Typography sx={{ color: 'green' }}>{'Done'.toUpperCase()}</Typography>
        <Typography>
          {
            'Red design with blue mixed deep color new Button, Create, Update functionality'
          }
        </Typography>
        <Typography sx={{ fontSize: 12, color: 'gray' }}>
          {new Date().toLocaleString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          sx={{ borderRadius: 5, textTransform: 'none' }}
        >
          Mark as done
        </Button>
      </CardActions>
    </Card>
  )
}

const cardStyle: SxProps<Theme> = {
  width: '20%',
  padding: 1,
}

export default TaskCard
