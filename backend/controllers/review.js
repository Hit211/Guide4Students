import Mentor from "../models/mentors.js";
import Review from "../models/review.js";

export const createReview = async (req, res) => {
    const { userId, mentorId, rating, comment } = req.body;
    try {
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({
                status: false,
                message: "Mentor not found",
            });
        }

        const newReview = await Review.create({
            userId,
            mentorId,
            rating,
            comment
        });

        mentor.reviews.push(newReview._id);

        mentor.mentorshipProvided += 1;

        const reviews = await Review.find({ mentorId });
        const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRatings / reviews.length;

        mentor.totalrating = avgRating;
        await mentor.save();

        return res.status(201).json({
            status: true,
            message: "Review Added Successfully",
            newReview,
        });
    } catch (error) {
        console.error("Error in createReview:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error,
        });
    }
};


export const getReviews = async (req, res) => {
    try {
        const mentorId = req.params.mentorId;
        const mentor = await Mentor.findById(mentorId).populate({
            path: 'reviews',
            select: 'rating comment',
            populate: {
                path: 'userId',
                select: 'name email'
            }
        });

        if (!mentor) {
            return res.status(404).json({
                status: false,
                message: "Mentor not found",
            });
        }

        res.status(200).json({
            status: true,
            data: mentor.reviews,
        });
    } catch (error) {
        console.error("Error in getReviews:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error,
        });
    }
};

export const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating } = req.body;
    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({
                status: false,
                message: "Review not found",
            });
        }

        review.rating = rating;
        await review.save();

        const reviews = await Review.find({ mentorId: review.mentorId });
        const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRatings / reviews.length;

        const mentor = await Mentor.findById(review.mentorId);
        review.rating = avgRating;
        await mentor.save();

        return res.status(200).json({
            status: true,
            message: "Review updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

export const deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({
                status: false,
                message: "Review not found",
            });
        }

        const mentorId = review.mentorId;

        await Review.findByIdAndDelete(reviewId);

        const reviews = await Review.find({ mentorId });
        const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = reviews.length > 0 ? totalRatings / reviews.length : 0;

        const mentor = await Mentor.findById(mentorId);
        review.rating = avgRating;
        await mentor.save();

        res.status(200).json({
            status: true,
            message: "Review deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};
