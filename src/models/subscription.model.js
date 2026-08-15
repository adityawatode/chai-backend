import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new.Schema({
    subcriber: {
        type: mongoose.Schema.Types.ObjectId,  // one whi is subscribing
        ref: "User"
    }, 
    channel: {
        type: mongoose.Schema.Types.ObjectId,  // one to whom "subscriber" is subscribing
        ref: "User"
    }
}, {
    timestamps: true
});

export const Subscription = mongoose.model("Subscription", subscriptionSchema); 