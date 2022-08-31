import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import Entry, { EntryModel } from '../../../models/Entry'
import mongoose from 'mongoose'

type response = 
  | { message: string }
  | EntryModel

export default function handler(req: NextApiRequest, res: NextApiResponse<response>) {
  const { id } = req.query
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' })

  switch(req.method) {
    case 'GET':
      return getEntry(res, id as string)
    case 'PUT':
      return updateEntry(req, res, id as string)
    case 'DELETE':
      return deleteEntry(res, id as string)
    default:
      return res.status(400).json({ message: 'Invalid endpoint' })
  }
}

const getEntry = async (res: NextApiResponse, id: string) => {
  try {
    await db.connect()
    const myEntry = await Entry.findById(id)
    if (!myEntry) {
      await db.disconnect()
      res.status(404).json({ message: 'Entry not found' })
    }
    await db.disconnect()
    res.status(200).json(myEntry)

  } catch (err: any) {
    await db.disconnect()
    console.log('err getting entry', err)
    res.status(400).json({ message: err.errors.status })
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<response>, id: string) => {
  try {
    await db.connect()
    const entryToUpdate = await Entry.findById(id)
    if (!entryToUpdate) {
      await db.disconnect()
      res.status(400).json({ message: 'Id not found' })
    } 

    const { description = entryToUpdate!.description, status = entryToUpdate!.status } = req.body
    const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
    await db.disconnect()
    res.status(200).json(updatedEntry!)
  } catch (err: any) {
    await db.disconnect()
    console.log('err updating entry', err)
    res.status(400).json({ message: err.errors.status })
  }
}

const deleteEntry = async (res: NextApiResponse, id: string) => {
  try {
    await db.connect()
    const entryToDelete = await Entry.findById(id)
    if (!entryToDelete) {
      await db.disconnect()
      res.status(400).json({ message: 'Id not found' })
    }
    await Entry.findByIdAndRemove(id)
    await db.disconnect()
    res.status(200).json({ message: 'Entry deleted' })
  } catch (err: any) {
    await db.disconnect()
    console.log('err deleting entry', err)
    res.status(400).json({ message: err.errors.status })
  }
}
