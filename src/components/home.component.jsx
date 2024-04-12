import React, { useState } from 'react'
import { Box, Fab, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { ModalComponent } from '../shared/components/modal.component'

export const HomeComponent = () => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Box
      height="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h6">
        Здесь появляется список страховки || Пока список пусто
      </Typography>
      <Box position="absolute" right={30} bottom={30}>
        <Tooltip title="Добавить пользователь">
          <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <ModalComponent open={open} handleClose={handleClose} />
      </Box>
    </Box>
  )
}
