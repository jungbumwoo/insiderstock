import mongoose from "mongoose";

const onboardSchema = new mongoose.Schema({
    ticker: String,
    company: String,
    MarketCap: String,
    price: String,
    shares: String,
    cost: String,
    date: { type: Date , default: Date.now()},
});

const model = mongoose.model('Onboard', onboardSchema);

export default model;