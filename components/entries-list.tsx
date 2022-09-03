import React, { useContext, useMemo } from 'react'
import { Paper, List } from '@mui/material'
import blueGrey from '@mui/material/colors'
import { EntriesCard } from './entries-card'
import { EntryStatus } from '../interfaces'
import { EntriesContext } from '../context/entries/entries-context'
import { UIContext } from '../context/ui/ui-context'
import s from './entries-list.module.css'

interface Props {
	status: EntryStatus
}

export const EntriesList: React.FC<Props> = ({ status }) => {
	const { entries, updateEntry } = useContext(EntriesContext)
	const { isDraggin, onDraggin } = useContext(UIContext)

	const entriesStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])
	const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	}
	const onDropEntry = (e: React.DragEvent<HTMLDivElement>) => {
		const id = e.dataTransfer.getData('text')
		const entry = entries.find(el => el._id === id)!
		entry.status = status
		updateEntry(entry, false)
		onDraggin(false)
	}

  return (
    <div
			className={isDraggin ? s.draggin : ''}
			onDrop={onDropEntry}
			onDragOver={allowDrop}
		>
			<Paper
				sx={{
					height: status !== 'pending' ? 'calc(100vh - 205px)' : 'calc(100vh - 250px)',
					padding: 1,
					marginTop: 1,
					overflow: 'auto',
					backgroundColor: 'secondary.main'
				}}
			>
				<List 
					sx={{ 
						opacity: isDraggin ? 0.2 : 1,
						transition: 'all 0.3s ease',
					}}
				>
					{
						entriesStatus.map(entry => (
							<EntriesCard key={entry._id} entry={entry} />
						))
					}
				</List>
			</Paper>
    </div>
  )
}
