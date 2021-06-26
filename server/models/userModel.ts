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
    role : {
        type: Number,
        default: 1
    },
    cart:{
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = model('Users', userSchema)