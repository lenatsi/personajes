const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JobSchema = new Schema({
  name: {type: String,},
  description:{type: String,},
  localization: {type: String,},
  city: {type: String,},
  savedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const JobModel = mongoose.model('jobs', JobSchema)

module.exports = JobModel
