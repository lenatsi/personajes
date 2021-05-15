const controller = {}
const User = require('../models/user')
const Job = require('../models/job.js')
const Application = require('../models/application.js')
const authJWT = require('../auth/jwt')
const validator = require('../validators/validator')
const user = require('../models/user')

controller.companyList = async (req, res) => {
    
    try {
    const jobs = await Job.aggregate([
      {
        $lookup: {
          from: 'applications',
          localField: '_id',
          foreignField: 'job',
          as: 'j',
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          localization: 1,
          type:1,
          company: 1,
          savedAt:1,
          updatedAt:1,
          applicants: { $size: '$j' },
        },
      },
    ])

    res.send(jobs)
    /* 
    const user = req.user
    const published = await Job.find({ publishedBy: user.id }).lean()
    for (const myjob of published) {
      const applicants = await Application.find(
        { job: myjob },
        'applicant cv -_id',
      )
      const numberApplicants = applicants.length
      myjob.napplicants = numberApplicants
    }
    
    res.send(published) */
  } catch (err) {
    console.log(err)
    res.status(401).send('Error')
  }
}
//listar apuntados a una oferta
controller.applicantsList = async (req, res) => {
  const job = req.params.id
  const user = req.user

  try {
    const jobauth = await Job.findById(job)
    if (String(jobauth.publishedBy) != user._id) {
      res.status(403).send('No puedes acceder')
      return
    }
    const applicants = await Application.find({ job: job }, 'applicant cv -_id')
    res.send(applicants)
  } catch (err) {
    console.log(error)
    res.status(401).send('Error')
  }
}

module.exports = controller
