import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    attrParent: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    content: {type: String, required: true},
    createdAt: Date,
});
const Review = mongoose.model('Review',reviewSchema);
export default Review;