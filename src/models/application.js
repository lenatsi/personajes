const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppSchema = new Schema({
  applicant: {type: Schema.Types.ObjectId, ref: 'user'},
  job:{type: Schema.Types.ObjectId, ref: 'job'},
  cv: {type:String},
  savedAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
})

const AppModel = mongoose.model('application', AppSchema)

module.exports = AppModel
