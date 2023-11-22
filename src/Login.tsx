import { Box, Button, Modal, SxProps, TextField, Theme } from '@mui/material'
// 0696FF
interface ILoginProps {
  open: boolean
  handleClose: () => void
  handleLogin: () => void
}
const Login = ({ open, handleClose, handleLogin }: ILoginProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField id="filled-basic" label="Email" variant="filled" />
        <TextField id="filled-basic" label="Password" variant="filled" />
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
          <Button
            variant="contained"
            sx={{ p: 1, width: 100 }}
            onClick={handleLogin}
          >
            Login
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
export default Login
