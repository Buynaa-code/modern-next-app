import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';

// Simplified version without Prisma adapter for demo purposes
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // In a real app, you would verify credentials against a database
        // This is a placeholder for demo purposes
        if (credentials?.email === 'admin@bank.mn' && credentials?.password === 'password') {
          return {
            id: '1',
            name: 'Админ Хэрэглэгч',
            email: 'admin@bank.mn',
            image: 'https://ui-avatars.com/api/?name=Admin+User',
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin', // Redirect back to signin on error
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET || 'TEMPORARY_SECRET_FOR_DEVELOPMENT',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 