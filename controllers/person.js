const person = require('../models/person')

exports.createPerson = (req, res, next) => {
    console.log(req.body)
    let person = new person(req.body)
    person.save((err) => {
        if(err) return next(err)
        res.json({
            status: true,
            message: "Person details inserted"
        })
    })
    
}

exports.getPerson = (req, res, next) => {
    person.findOne({userId: req.parms.userId}, (err,data) => {
        if(err) return next(err)
        res.json(data)
    })
}
exports.updatePerson = (req,res, next) => {
    person.findOneAndUpdate({userId: req.parms.userId},req.body, (err) => {
        if(err) return next (err)
        res.status(204).send()
    })
}

exports.deletePerson = (req, res, next) => {
    person.findOneAndRemove({userId: req.parms.userId}, (err) => {
        if(err) return next(err)
        res.status(204).send()
    })
}

