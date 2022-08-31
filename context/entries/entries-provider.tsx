import React, { useReducer, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { EntriesContext } from './entries-context'
import { EntriesReducer } from './entries-reducer'
import { Entry } from '../../interfaces'
import { entriesApi } from '../../apis'

export interface EntriesState {
  entries: Entry[]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: []
}

export const EntriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, ENTRIES_INITIAL_STATE)

  const { enqueueSnackbar } = useSnackbar()

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', {
      description
    })
    dispatch({ type: 'add-entry', payload: data })
  }

  const updateEntry = async ({ _id, description, status }: Entry, snack = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({ type: 'entry-updated', payload: data })

      if (snack) {
        enqueueSnackbar('Entry updated', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      }

    } catch (err) {
      console.log({ err })
    }
  }

  const deleteEntry = async (id: string) => {
    try {
      const { data } = await entriesApi.delete(`/entries/${id}`)
      dispatch({ type: 'entry-delete', payload: id })
      enqueueSnackbar('Entry deleted', {
        variant: 'error',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
    } catch (err) {
      console.log({ err })
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: 'entry-refresh', payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry, deleteEntry }}>
      {children}
    </EntriesContext.Provider>
  )
}
