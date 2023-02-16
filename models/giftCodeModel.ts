import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const giftCodeSchema = new Schema({
    code: String,
    amount: Number,
    expired: Boolean
})

const GiftCode = mongoose.model('Giftcode', giftCodeSchema);
export default GiftCode;