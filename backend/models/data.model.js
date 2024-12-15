import mongoose from "mongoose";

const dataSetSchema = new mongoose.Schema({
    Day:{
        type:Number  
    },
    Age:{
        type:String
    },
    Gender:{
        type:String 
    },
    A:{
        type:Number
    },
    B:{
        type:Number
    },
    C:{
        type:Number
    },
    D:{
        type:Number
    },
    E:{
        type:Number
    },
    F:{
        type:Number
    }
},{
    timestamps: true
})

export const Dataset = mongoose.model("Dataset", dataSetSchema)