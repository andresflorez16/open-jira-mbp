import { EntriesState } from './entries-provider'
import { Entry } from '../../interfaces'

type EntriesAction = 
	| { type: 'add-entry', payload: Entry }
	| { type: 'entry-updated', payload: Entry }
	| { type: 'entry-refresh', payload: Entry[] }
	| { type: 'entry-delete', payload: string }

export const EntriesReducer = (state: EntriesState, action: EntriesAction): EntriesState => {
	switch (action.type) {
		case 'add-entry':
			return { 
			...state,
			entries: [ ...state.entries, action.payload ]
			}
		case 'entry-updated':
			return { 
			...state,
			entries: state.entries.map(entry => {
					if (entry._id === action.payload._id) {
						entry.description = action.payload.description
						entry.status = action.payload.status
					}
					return entry
				})
			}
		case 'entry-refresh':
			return {
				...state,
				entries: [ ...action.payload ]
		}
		case 'entry-delete':
			return {
				...state,
				entries: state.entries.filter(entry => entry._id !== action.payload)
		}
		default:
			return state
	}
}
