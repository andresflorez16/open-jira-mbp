import mongoose from 'mongoose'
import EntryModel from '../models/Entry'
import { Entry } from '../interfaces'

const mongooConnections = {
	isConnected: 0
}

export const connect = async () => {
	if (mongooConnections.isConnected) {
		console.log('connected')
		return
	}

	if (mongoose.connections.length > 0) {
		mongooConnections.isConnected = mongoose.connections[0].readyState

		if (mongooConnections.isConnected) {
			console.log('connected back')
			return
		}
		await mongoose.disconnect()
	}

	await mongoose.connect(process.env.MONGO_URL || '')
	mongooConnections.isConnected = 1
	console.log('connected')
}

export const disconnect = async () => {
	if (process.env.NODE_ENV === 'development') return
	if (mongooConnections.isConnected === 0) return

	await mongoose.disconnect()
	console.log('disconnect')
}

export const getEntryById = async (id: string): Promise<Entry | null> => {
	if (!mongoose.isValidObjectId(id)) return null

	await connect()
	const entry = await EntryModel.findById(id).lean() 
	await disconnect()
	mongooConnections.isConnected = 0

	return JSON.parse(JSON.stringify(entry))
}
