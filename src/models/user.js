const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SchemaMongo = mongoose.Schema

const Schema = new SchemaMongo({
  nombre: { type: String },
  apellidos: { type: String },
  photo: {type: String, default: 'https://images.pexels.com/photos/2451568/pexels-photo-2451568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
  role: { type: String, enum: ['user', 'company'], default:'user', require: true},
  cv: { type: String },
  bio: { type: String, default: 'Pon aquí tu bio', require:true},
  abilities: {type: String, default: 'Tengo muchas habilidades, pero olvidé ponerlas', require:true},
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  //Ñdir teléfono
  //experiencia y educación, modelo aparte e inyectar como objeto, igual que applies
})

Schema.pre('save', async function (next) {
  try {
    const user = this
    const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    user.password = hash
    next()
  } catch (error) {
    next(error)
  }
})

Schema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password)
  return compare
}

module.exports = mongoose.model('user', Schema)
