const controller = {}
const Jobs = require('../models/job.js')
const User = require('../models/user.js')
const validator = require('../validators/validatorjobs.js')

controller.savejobs = async (req, res) => {
  let name = req.body.name
  let description = req.body.description
  let localization = req.body.localization
  let city = req.body.city

  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    console.log('Error1', error)
    res.status(400).send('Error1', error)
    return
  } else {
    if (name && description && localization && city) {
      try {
        const jobs = new Jobs({
          name: name,
          description: description,
          localization: localization,
          city: city,
        })
        await jobs.save()
        res.status(204).send()
      } catch (err) {
        res.status(500).send(err)
      }
    } else {
      console.log('Error3', error)
      res.status(400).send()
    }
  }
}
controller.getjobs = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      const jobs = await Jobs.findById(id)
      res.json(jobs)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}
controller.getalljobs = async (req, res) => {
  try {
    let jobs = await Jobs.find()
    res.send(jobs)
  } catch {
    console.log(error)
    res.status(500).send('ocurrió un error')
  }

  /* const filter = req.query.filter
  const startDate = req.query.startDate
  const endDate = req.query.endDate
  console.log(filter)
  console.log(startDate)
  const filters = []
    if (filter) {
        filters.push({ fullname: new RegExp(filter, 'i') })
    }
    if (startDate && endDate) {
        filters.push({
            "localization": {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        })
    }
    try {
        let profiles = {}
        if (filters.length > 0) {
            profiles = await jobs.aggregate([
                { $addFields: { fullname: { $concat: ["$name", " ", "$description"] } } },
                {
                    $match: { $and: filters }
                }
            ])
        } else {
            profiles = await jobs.find()
        }
        res.send(profiles)
    } catch (error) {
        console.log(error)
        res.status(500).send("ocurrió un error")
    }
   */
}
controller.updatejobs = async (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const localization = req.body.localization
  const city = req.body.city
  const jobsId = req.params.id

  const validation = validator.validate(req.body)

  if(validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  }else{
    if (jobsId) {
      try {
        await Jobs.findByIdAndUpdate( jobsId,{
          name: name,
          description: description,
          localization: localization,
          city: city,
          updatedAt: Date.now(),
        })
        res.status(204).send()
      } catch (err) {
        res.status(500).send(err)
      }
    } else {
      res.status(400).send()
    }
  }
}
controller.deletejobs = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      await Jobs.findByIdAndDelete(id)
      res.status(204).send()
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}

module.exports = controller
