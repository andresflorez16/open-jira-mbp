import React, { useReducer } from 'react'
import { UIContext } from './ui-context'
import { uiReducer } from './ui-reducer'

export interface UIState {
	sidemenuOpen: boolean
	isAdding: boolean
	isDraggin: boolean
}

const UI_INITIAL_STATE: UIState = {
	sidemenuOpen: false,
	isAdding: false,
	isDraggin: false
}

interface Props {
	children: React.ReactNode
}

export const UIProvider: React.FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

	const openSideMenu = () => {
		dispatch({ type: 'open sidebar' })
	}
	const closeSideMenu = () => dispatch({ type: 'close sidebar' })
	const isAddingEntry = (adding: boolean) => dispatch({ type: 'adding', payload: adding })
	const onDraggin = (drag: boolean) => dispatch({ type: 'draggin', payload: drag })

  return (
		<UIContext.Provider value={{ ...state, openSideMenu, closeSideMenu, isAddingEntry, onDraggin }}>
			{children}
    </UIContext.Provider>
  )
}
