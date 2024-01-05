const mongoose = require('mongoose')

const dentistSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    firstName: {
        type: String,
        required:[true, 'First name is Required']
    },
    lastName: {
        type: String,
        required:[true, 'First name is Required']
    },
    phone: {
        type: String,
        required:[true, 'Phone Number is Required']
    },
    email: {
        type: String,
        required:[true, 'Email is Required']
    },
    address: {
        type: String,
        required:[true, 'Address is Required']
    },
    experience: {
        type: String,
        required:[true, 'Do not Leave Blank']
    },
    status:{
        type: String,
        default: 'pending'
    },
    availability: {
        type: Object,
        required: [true, 'Work Time is Required']
    }
},
    {timeStamps:true}
)



const dentistModel = mongoose.model("dentists", dentistSchema)
module.exports = dentistModel