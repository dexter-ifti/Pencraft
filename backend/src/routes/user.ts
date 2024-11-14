import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signupSchema, signinSchema } from '@ifti_taha/common';
import * as bcrypt from 'bcryptjs'; // For password hashing


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();

// Centralized error handler
const errorHandler = (c: any, error: any) => {
    console.error('Error:', error);
    const status = error.status || 500;
    const message = error.message || 'Internal server error';

    c.status(status);
    return c.json({
        success: false,
        message,
        error: c.env.NODE_ENV === 'development' ? error : undefined
    });
};

// Prisma client initialization
const getPrismaClient = (databaseUrl: string) => {
    return new PrismaClient({
        datasourceUrl: databaseUrl,
    }).$extends(withAccelerate());
};

// SIGNUP ROUTE
userRouter.post('/signup', async (c) => {
    try {
        // Validate input
        const body = await c.req.json();
        const { success } = signupSchema.safeParse(body);

        if (!success) {
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }

        const prisma = getPrismaClient(c.env?.DATABASE_URL);

        // Check if user exists
        const userExists = await prisma.user.findUnique({
            where: { email : body.email }
        });

        if (userExists) {
            return c.json({
                success: false,
                message: 'User already exists'
            }, 409);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        // Create user
        const user = await prisma.user.create({
            data: {
                email : body.email,
                firstName : body.firstName,
                lastName : body.lastName,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
            }
        });

        // Generate JWT
        const token = await sign({
            id: user.id,
            email: user.email
        }, c.env?.JWT_SECRET);

        return c.json({
            success: true,
            message: 'Signup successful',
            data: {
                user,
                token
            }
        }, 201);

    } catch (error) {
        return errorHandler(c, error);
    }
});

// SIGNIN ROUTE
userRouter.post('/signin', async (c) => {
    try {
        // Validate input
        const body = await c.req.json();
        const { success } = signinSchema.safeParse(body);

        if (!success) {
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }

        const prisma = getPrismaClient(c.env?.DATABASE_URL);

        // Find user
        const user = await prisma.user.findUnique({
            where: { email : body.email }
        });

        if (!user) {
            return c.json({
                success: false,
                message: 'Invalid credentials'
            }, 401);
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(body.password, user.password);
        if (!isValidPassword) {
            return c.json({
                success: false,
                message: 'Invalid credentials'
            }, 401);
        }

        // Generate JWT
        const token = await sign({
            id: user.id,
            email: user.email
        }, c.env?.JWT_SECRET);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return c.json({
            success: true,
            message: 'Signin successful',
            data: {
                user: userWithoutPassword,
                token
            }
        });

    } catch (error) {
        return errorHandler(c, error);
    }
});

export default userRouter;