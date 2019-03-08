const mongoose = require('mongoose')

const Schema = mongoose.Schema

const personSchema = new Schema(
    {
        userId: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, 'can\'t be blank'],
            index: true
        },
        firstName: {
            type: String,

        },
        lastName: {
            type: String,
        },
        socialMedia: {
            twitter: {
                type: String,
            },
            website: {
                type: String,
            },
            linkedin: {
                type: String,
            },
            facebook: {
                type: String,
            },
            google: {
                type: String,
            },
            github: {
                type: String,
            }
        },
        mobileNumber: {
            type: String,
        },
    },
    { timestamps: true }

)

personSchema.plugin(uniqueValidator, {message: 'is already taken.'})
const Person = mongoose.model('Person',personSchema)
module.exports = Person