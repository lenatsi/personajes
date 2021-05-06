const controller = {}
const User = require('../models/user')
const Job = require('../models/job.js')
const Application = require('../models/application.js')
const authJWT = require('../auth/jwt')
const validator = require('../validators/validator')
const config = require('../config')

controller.signup = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const nombre = req.body.nombre
  const apellidos = req.body.apellidos
  const cv = req.body.cv
  const role = req.body.role

  const validation = validator.validate(req.body)
  if (validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  } else {
    if (!email || !password || !nombre || !apellidos || !cv || !role) {
      res.status(400).send()
      return
    }
    try {
      const user = new User({
        nombre: nombre,
        apellidos: apellidos,
        cv: cv,
        role: role,
        email: email,
        password: password,
      })
      await user.save()
      const data = await User.findOne({ email: email })
      res.send({ status: 'ok', data: data })
    } catch (err) {
      console.log(err)
      res.status(500).send(err.message)
    }
  }
}

controller.login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(401).send('Credenciales incorrectas')
    return
  }
  try {
    const user = await User.findOne({ email: email })

    if (!user) {
      res.status(401).send('Credenciales incorrectas')
      return
    }
    const validate = await user.isValidPassword(password)
    if (!validate) {
      res.status(401).send('Credenciales incorrectas')
      return
    }
    const dataToken = authJWT.createToken(user)
    return res.send({
      access_token: dataToken[0],
      expires_in: dataToken[1],
    })
  } catch (err) {
    console.log(err)
    res.status(401).send('Credenciales incorrectas')
    return
  }
}

controller.userDetail = async (req, res) => {
  const user = req.user
  const applied = await Application.find({applicant: user.id}, 'job -_id')
  console.log(applied)
  res.send({ status: 'ok', data: req.user, jobs: applied })
}

controller.apply = async (req, res) => {
  const user = req.user
  if (user.role == 'company') {
    res.status(400).send('Solo un usuario puede apuntarse')
    return
  }
  try {
    const jobDeclared = await Job.findById(req.body.job)

    if (!jobDeclared) {
      res.status(400).send('El trabajo no existe')
      return
    }
    const prevApply = await Application.findOne({
      job: jobDeclared,
      applicant: user.id,
    })
    if (prevApply) {
      res.status(400).send('Ya has aplicado a esta oferta')
      return
    }
    const application = new Application({
      applicant: user,
      job: jobDeclared,
      cv: req.body.cv,
      updatedAt: Date.now(),
    })
    await application.save()
    res.status(201).send()
  } catch (error) {
    console.log(error)
    res.status(401).send('Error')
  }
}

module.exports = controller
