const mongoose = require("mongoose")

const password = "291116Carlos"
const dbname = "Jobs"
const user = "alenatsit"
const host = "cluster0.5ppki.mongodb.net"

const uri = `mongodb+srv://${user}:${password}@${host}/${dbname}?retryWrites=true&w=majority`

module.exports = mongoose.connect(uri,
    {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
    })