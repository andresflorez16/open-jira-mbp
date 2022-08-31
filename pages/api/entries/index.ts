import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import Entry, { EntryModel } from '../../../models/Entry'

type response = 
  | { message: string }
  | EntryModel[]
  | EntryModel

export default function handler(req: NextApiRequest, res: NextApiResponse<response>) {
  switch(req.method) {
    case 'GET':
      return getEntries(res)
    case 'POST':
      return newEntry(req, res)
    default:
      return res.status(400).json({ message: 'Invalid endpoint' })
  }
}

const getEntries = async (res: NextApiResponse<response>) => {
  await db.connect()
  const entries = await Entry.find().sort({ createdAt: 'ascending' })
  await db.disconnect()
  res.status(200).json(entries)
}

const newEntry = async (req: NextApiRequest, res: NextApiResponse<response>) => {
  const { description = '' } = req.body

  const entry = new Entry({
    description,
    createdAt: Date.now()
  })

  try {
    await db.connect()
    await entry.save()
    await db.disconnect()

    res.status(201).json(entry)
  } catch (err) {
    await db.disconnect()
    console.log('err new entry', err)
    res.status(400).json({ message: 'Error new entry' })
  }
}


