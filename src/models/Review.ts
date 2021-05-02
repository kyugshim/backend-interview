import { connect } from '../database';
import { Review } from '../interface/Review';


export async function SelectReview() {
    const conn = await connect();
    const review: any = await conn.query('SELECT * FROM review');
    conn.end();

    return review[0];
}

export async function CreateReview(newReview: Review) {
    const conn = await connect();

    await conn.query('INSERT INTO review SET ?', [newReview]);
    conn.end();

    return 0;
}

export async function DeleteReview(id: number | string) {
    const conn = await connect();

    await conn.query('DELETE FROM review WHERE review.id =?', [id]);
    conn.end();

    return 0;
}

export async function UpdateReview(updateReview: Review, id: number | String) {
    const conn = await connect();

    await conn.query('UPDATE review SET ? WHERE review.id = ?', [updateReview, id]);
    conn.end();

    return 0;
}