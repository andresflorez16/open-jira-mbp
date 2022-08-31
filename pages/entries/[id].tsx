import React, { useState, useMemo, useContext } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { 
  capitalize,
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  IconButton
} from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { getEntryById } from '../../database/db'
import { EntriesContext } from '../../context/entries/entries-context'
import { Layout } from '../../components/layouts/Layout'
import { Entry, EntryStatus } from '../../interfaces'
import { getFormatDistanceToNow } from '../../utils/dateFunctions'

const status: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}

const EntryPage: NextPage<Props> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useContext(EntriesContext)

  const router = useRouter()

  const [inputValue, setInputValue] = useState(entry.description)
  const [statusValue, setStatusValue] = useState(entry.status)
  const [touch, setTouch] = useState(false)

  const isValid = useMemo(() => inputValue.length <= 0 && touch, [inputValue, touch]) 

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.value as EntryStatus
    setStatusValue(status)
  }

  const onDelete = () => {
    deleteEntry(entry._id)
    router.push('/')
  }

  const onSave = () => {
    updateEntry({
      ...entry,
      status: statusValue,
      description: inputValue
    }, true)
  }

  return (
    <Layout title='OpenJira - MyEntry'>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
        >
          <Card>
            <CardHeader
              title={<Typography fontWeight='bold' variant='h3'>My entry:</Typography>}
              subheader={getFormatDistanceToNow(entry.createdAt)}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='New entry'
                autoFocus
                multiline
                onChange={handleInputValue}
                value={inputValue}
                onBlur={() => setTouch(true)}
                error={isValid}
              />
              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup
                  row
                  onChange={handleStatus}
                  value={statusValue}
                >
                  {
                    status.map(status => (
                      <FormControlLabel 
                        key={status} 
                        value={status}
                        control={<Radio />}
                        label={capitalize(status)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Button
                disabled={inputValue.length <= 0}
                color='success'
                variant='contained'
                startIcon={<SaveOutlinedIcon />}
                onClick={onSave}
              >
                Save
              </Button>
              <IconButton
                color='error'
                sx={{ backgroundColor: '#333' }}
                onClick={onDelete}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }

  const entry = await getEntryById(id)

  if (!entry){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage
