import { Request, Response } from 'express';

// Interface Review
import { Review } from '../interface/Review';

import { SelectReview, CreateReview, DeleteReview, UpdateReview } from '../models/Review';


// Get all Review
export async function getReview(req: Request, res: Response): Promise<Response> {

    const reviews = await SelectReview();
    return res.json(reviews);
}

// Create a review
export async function createReview(req: Request, res: Response): Promise<Response> {
    const newReview: Review = req.body;

    newReview['status'] = 'active';        //Default value

    // Models
    await CreateReview(newReview);

    // Success Response
    return res.json({
        message: "Review Created"
    });
}

// Delete a review
export async function deleteReview(req: Request, res: Response): Promise<Response> {
    const id = req.params.Id;

    // Models
    await DeleteReview(id);

    // Success Response
    return res.json({
        message: "Review Deleted"
    });
}

// Update a review
export async function updateReview(req: Request, res: Response): Promise<Response> {
    // Save the params
    const id = req.params.productId;
    const updateReview: Review = req.body;

    // if there are no products, their status must change to inactive
    if (updateReview['quantity'] === 0) {
        updateReview['status'] = 'inactive';
    } else {
        updateReview['status'] = 'active';
    }

    await UpdateReview(updateReview, id);

    // Success Response
    return res.json({
        message: "Review Updated"
    });
}