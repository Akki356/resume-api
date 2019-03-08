const express = require('express')
const router = new express.Router()
const methodOverride = require('method-override')

const errHandler = require('../lib/errorHandler')
const logErrors = require('../lib/logs')

const person = require('../controllers/person')
const cors = require('cors')

router.use(cors())

router.get('/', (req, res) => {
    res.json({
        message: 'welcome to our api!'
    })
})

router.post('/person', person.createPerson)
router.get('/person',person.getPerson)
router.put('/person',person.updatePerson)

router.use(mothodOver)
router.use(logErrors)
router.use(errorHandler)

module.exports = router
