import { Theme } from '@emotion/react'
import { Button, SxProps } from '@mui/material'

interface IStatusButtonProps {
  isActive: boolean
  label: string
  onPress: () => void
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
          sx={{ borderRadius: 5, ...style }}
        >
          {label}
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={onPress}
          sx={{ borderRadius: 5, ...style }}
        >
          {label}
        </Button>
      )}
    </>
  )
}

export default StatusButton
