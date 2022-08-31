import React from 'react'

interface ContextProps {
	sidemenuOpen: boolean
	isAdding: boolean
	isDraggin: boolean
	openSideMenu: () => void
	closeSideMenu: () => void
	isAddingEntry: (adding: boolean) => void
	onDraggin: (drag: boolean) => void
}

export const UIContext = React.createContext({} as ContextProps)
