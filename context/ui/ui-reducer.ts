import { UIState } from './ui-provider'

type UIType = 
	| { type: 'open sidebar' }
	| { type: 'close sidebar' }
	| { type: 'adding', payload: boolean }
	| { type: 'draggin', payload: boolean }

export const uiReducer = (state: UIState, action: UIType): UIState => {
	switch (action.type) {
		case 'open sidebar':
			return {
				...state,
				sidemenuOpen: true
		}
		case 'close sidebar':
			return {
				...state,
				sidemenuOpen: false
		}
		case 'adding':
			return {
			...state,
			isAdding: action.payload
		}
		case 'draggin':
			return {
			...state,
			isDraggin: action.payload
		}
		default:
			return state
	}
}
