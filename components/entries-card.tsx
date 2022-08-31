import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '../interfaces'
import { UIContext } from '../context/ui/ui-context'
import { getFormatDistanceToNow } from '../utils/dateFunctions'

interface Props {
  entry: Entry
}

export const EntriesCard: React.FC<Props> = ({ entry }) => {
  const date = new Date(entry.createdAt)
  const { onDraggin } = useContext(UIContext)

  const router = useRouter()

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', entry._id)
    onDraggin(true)
  }

  const onDragEnd = () => onDraggin(false)

  const onClick = () => {
    router.push(`entries/${entry._id}`)
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography
            sx={{ whiteSpace: 'pre-line' }}
          >{entry.description}</Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Typography variant='body2'>{getFormatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
