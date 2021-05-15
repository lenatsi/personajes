const mongoose = require('mongoose')
const Schema = mongoose.Schema

//preguntar como sacar el nombre de la compañía y no el id y logo

const JobSchema = new Schema({
  name: { type: String },
  description: { type: String },
  localization: { type: String },
  city: { type: String },
  type: {
    type: String,
    enum: ['Tiempo completo', 'Freelancer', 'Tiempo parcial', 'Proyecto', 'Prácticas'],
    default: 'Tiempo completo',
    require: true,
  },
  publishedBy: { type: Schema.Types.ObjectId, ref: 'user' },
  savedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const JobModel = mongoose.model('jobs', JobSchema)

module.exports = JobModel
