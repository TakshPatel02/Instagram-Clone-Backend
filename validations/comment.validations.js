import { z } from 'zod';

const commentSchema = z.object({
    postId: z.string(),
    commentText: z.string().min(1, 'Comment text cannot be empty.'),
});

export default commentSchema;