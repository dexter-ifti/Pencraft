import { Hono } from 'hono'
import { verify } from 'hono/jwt';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createBlogSchema, updateBlogSchema } from '@ifti_taha/common';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

// BLOG PROTECTION MIDDLEWARE
blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        c.status(401);
        return c.json({ message: 'Unauthorized - No valid token provided' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const payload = await verify(token, c.env?.JWT_SECRET);
        c.set('userId', (payload as { id: string }).id);
        await next();
    } catch (error) {
        c.status(401);
        return c.json({
            message: 'Unauthorized - Invalid token',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Create post
blogRouter.post('/', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const {success} = createBlogSchema.safeParse(body); 
        
        if (!success) {
            c.status(400);
            return c.json({ message: 'Invalid request body' });
        }

        

        const post = await prisma.post.create({
            data: {
                title : body.title,
                description : body.description,
                authorId: userId
            }
        });

        return c.json({
            message: 'Post created successfully',
            post
        }, 201);

    } catch (error) {
        console.error('Blog creation error:', error);
        c.status(500);
        return c.json({
            message: 'Failed to create blog post',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Update post
blogRouter.put('/:id', async (c) => {
    const userId = c.get('userId');
    const postId = c.req.param('id');

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const {success} = updateBlogSchema.safeParse(body);

        if (!success) {
            c.status(400);
            return c.json({ message: 'Invalid request body' });
        }

        // First check if post exists and belongs to user
        const existingPost = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!existingPost) {
            c.status(404);
            return c.json({ message: 'Post not found' });
        }

        if (existingPost.authorId !== userId) {
            c.status(403);
            return c.json({ message: 'Not authorized to update this post' });
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
                authorId: userId
            },
            data: {
                ...(body.title && { title: body.title }),
                ...(body.description && { description : body.description })
            }
        });

        return c.json({
            message: 'Post updated successfully',
            post: updatedPost
        });

    } catch (error) {
        console.error('Blog update error:', error);
        c.status(500);
        return c.json({
            message: 'Failed to update blog post',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Get all posts
blogRouter.get('/bulk', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return c.json({
            message: 'Posts fetched successfully',
            posts
        });

    } catch (error) {
        console.error('Bulk fetch error:', error);
        c.status(500);
        return c.json({
            message: 'Failed to fetch posts',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Get single post
blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        email: true
                    }
                }
            }
        });

        if (!post) {
            c.status(404);
            return c.json({ message: 'Post not found' });
        }

        return c.json({
            message: 'Post fetched successfully',
            post
        });

    } catch (error) {
        console.error('Blog fetch error:', error);
        c.status(500);
        return c.json({
            message: 'Failed to fetch blog post',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

