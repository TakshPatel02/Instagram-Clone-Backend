import { z } from 'zod';

const commentSchema = z.object({
    commentText: z.string().min(1, 'Comment text cannot be empty.'),
});

export default commentSchema;