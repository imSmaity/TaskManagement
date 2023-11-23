import { Theme } from '@emotion/react'
import { Button, SxProps } from '@mui/material'

interface IStatusButtonProps {
  isActive: boolean
  label: string
  onPress: (e: any) => void
  style?: SxProps<Theme>
}

const StatusButton = ({
  isActive,
  label,
  onPress,
  style,
}: IStatusButtonProps) => {
  return (
    <>
      {isActive ? (
        <Button
          variant="contained"
          onClick={onPress}
          disableElevation={true}
          sx={{
            borderRadius: 5,
            textTransform: 'none',
            backgroundColor: '#0696FF',
            ...style,
          }}
        >
          {label}
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={onPress}
          disableElevation={true}
          sx={{
            borderRadius: 5,
            textTransform: 'none',
            borderColor: '#0696FF',
            color: '#0696FF',
            ...style,
          }}
        >
          {label}
        </Button>
      )}
    </>
  )
}

export default StatusButton
