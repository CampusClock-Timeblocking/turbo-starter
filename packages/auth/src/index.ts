import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@repo/db';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql', // or "mysql", "postgresql", ...etc
    }),

    trustedOrigins: [process.env.NEXT_PUBLIC_API_URL!, 'http://localhost:3001'],
    socialProviders: {
        notion: {
            enabled: true,
            clientId: process.env.NOTION_CLIENT_ID!,
            clientSecret: process.env.NOTION_CLIENT_SECRET!,
            redirectUri: process.env.NOTION_REDIRECT_URI!,
        },
    },
}) as ReturnType<typeof betterAuth>;
