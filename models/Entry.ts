import mongoose, { Model, Schema } from 'mongoose'
import {Entry} from '../interfaces'

export interface EntryModel extends Entry {}

const entrySchema = new Schema({
	description: { type: String, required: true },
	createdAt: { type: Number },
	status: { 
		type: String, 
		enum: { 
			values: ['pending', 'in-progress', 'finished'], 
			message: '{VALUE} no available'
		},
		default: 'pending'
	}
}) 

const EntryModel: Model<EntryModel> = mongoose.models.Entry || mongoose.model('Entry', entrySchema)

export default EntryModel
