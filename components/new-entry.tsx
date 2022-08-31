import React, { useState, useContext } from 'react'
import { Box, Button, TextField } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { EntriesContext } from '../context/entries/entries-context'
import { UIContext } from '../context/ui/ui-context'

export const NewEntry: React.FC = () => {
  const [input, setInput] = useState('')
  const [touch, setTouch] = useState(false)

  const { addNewEntry } = useContext(EntriesContext)
  const { isAdding, isAddingEntry } = useContext(UIContext)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const onSave = () => {
    if (input.length === 0) return
    console.log(input)
    addNewEntry(input)
    isAddingEntry(false)
    setTouch(false)
    setInput('')
  }

  return (
    <Box
      sx={{
        margin: 1
      }}
    >
      {
        isAdding
          ? (
            <>
              <TextField
                sx={{ marginTop: 1, marginBottom: 1 }}
                placeholder='Description'
                fullWidth
                multiline
                autoFocus
                label='New ToDo'
                value={input}
                onChange={handleInput}
                error={input.length <= 0 && touch}
                onBlur={() => setTouch(true)}
              >
              </TextField>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Button 
                  color='error'
                  onClick={() => isAddingEntry(false)}
                >Cancel</Button>
                <Button
                  color='success'
                  endIcon={<SaveOutlinedIcon/>}
                  onClick={onSave}
                >Save</Button>
              </Box>
            </>
          )
          : (
              <Button
                onClick={() => isAddingEntry(true)}
                fullWidth
                startIcon={<AddCircleOutlinedIcon/>}
                variant='outlined'
              >
                Add New
              </Button>
          )
      }
      
    </Box>
  )
}
