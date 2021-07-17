import {model, Schema} from 'mongoose'

const userSchema: any = new Schema({
    name :{
        type:String,
        required: true,
        trim: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        default: []
    },
    mobile : {
        type: Number,
        default: null
    },
    dob : {
        type: Date,
        default: null
    },
    role : {
        type: Number,
        default: 1
    },
    expense: {
        type: Array,
        default:[]
    },
    income: {
        type:Array,
        default:[]
    }
}, {
    timestamps: true
})

module.exports = model('Users', userSchema)