import mongoose from 'mongoose';

const {Schema: {Types: {ObjectId}}} = mongoose

const cartSchema = mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    products: [
        {
            quantity: {
                type: Number,
                default: 1,
            },
            product: {
                type: ObjectId,
                ref: 'product'
            }
        }
    ]
})

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema)