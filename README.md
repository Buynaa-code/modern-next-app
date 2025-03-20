# Modern Next.js Application

A clean, modern web application built with Next.js, Tailwind CSS, NextAuth.js, and Prisma. This application includes authentication, a dashboard layout with sidebar navigation, user profile management, and CRUD functionality for managing items.

## Features

- **Next.js App Router**: Modern file-based routing system with server components
- **Authentication**: Integration with NextAuth.js for various authentication providers
- **Database**: PostgreSQL integration with Prisma ORM for type-safe database access
- **Dashboard**: Clean and responsive dashboard layout with sidebar navigation
- **Dark Mode**: Full dark mode support using next-themes
- **Item Management**: Complete CRUD operations for managing items
- **User Profile**: User profile management with editable fields
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/modern-next-app.git
cd modern-next-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables in `.env`:

```
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
GITHUB_ID=your_github_id (optional)
GITHUB_SECRET=your_github_secret (optional)
GOOGLE_ID=your_google_id (optional)
GOOGLE_SECRET=your_google_secret (optional)
```

4. Initialize the database:

```bash
npx prisma migrate dev --name init
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
modern-next-app/
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets
├── src/                    # Source code
│   ├── app/                # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── profile/        # Profile pages
│   ├── components/         # React components
│   │   ├── forms/          # Form components
│   │   ├── layout/         # Layout components
│   │   ├── ui/             # UI components
│   ├── lib/                # Library code
│   ├── types/              # TypeScript types
```

## Authentication

This application uses NextAuth.js for authentication. By default, it includes:

- Credentials authentication (email/password)
- GitHub OAuth (optional)
- Google OAuth (optional)

To enable GitHub or Google authentication, add your client ID and secret to the `.env` file.

## Database

This application uses PostgreSQL with Prisma ORM. The database schema includes:

- User model (with NextAuth integration)
- Item model for CRUD operations

## Deployment

This application can be deployed to platforms like Vercel, Netlify, or any hosting provider that supports Next.js.

## License

This project is licensed under the MIT License.
