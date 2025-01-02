import { Box, CircularProgress, Typography } from '@mui/material'

function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        Yükleniyor...
      </Typography>
    </Box>
  )
}

export default LoadingSpinner 