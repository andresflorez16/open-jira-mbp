import React from 'react'
import { Entry } from '../../interfaces'

interface ContextProps {
  entries: Entry[]
  addNewEntry: (description: string) => void
  updateEntry: (entry: Entry, snack: boolean) => void
  deleteEntry: (id: string) => void
}

export const EntriesContext = React.createContext({} as ContextProps)
