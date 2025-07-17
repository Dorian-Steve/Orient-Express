# Orient Express

This is a web application built with the [T3 Stack](https://create.t3.gg/), a modern full-stack boilerplate for building scalable and type-safe applications. This project is bootstrapped with `create-t3-app`.

## ✨ Tech Stack

This project uses a modern and robust technology stack:

- **Framework**: [Next.js](https://nextjs.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org) with Supabase Adapter
- **ORM**: [Prisma](https://prisma.io)
- **Database**: PostgreSQL (managed via Supabase)
- **API Layer**: [tRPC](https://trpc.io) for end-to-end typesafe APIs
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: shadcn/ui
- **Environment Variables**: [T3 Env](https://env.t3.gg/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v20.x or later)
- [pnpm](https://pnpm.io/installation)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/orient-express.git
    cd orient-express
    ```

2.  Install dependencies:
    ```sh
    pnpm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the root of the project and add the necessary environment variables. You will need to provide your Supabase project URL, anon key, and database connection string.

    ```env
    # .env.example

    # Database
    # You can get this from your Supabase project settings > Database > Connection string
    DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-DB-HOST]:5432/postgres"

    # NextAuth.js
    # You can generate a secret using `openssl rand -base64 32`
    NEXTAUTH_SECRET="your-nextauth-secret"
    NEXTAUTH_URL="http://localhost:3000"

    # Supabase
    NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
    ```

4.  Apply database migrations:
    This will sync your Prisma schema with your PostgreSQL database.
    ```sh
    pnpm db:push
    ```
    Or to run migrations:
    ```sh
    pnpm db:generate
    ```

5.  Run the development server:
    ```sh
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

The application source code is located in the `src/` directory.

```
src/
├── app/              # Next.js App Router: pages, layouts, and API routes
│   ├── (admin)/      # Route group for admin pages
│   ├── (auth)/       # Route group for authentication pages
│   ├── (pages)/      # Route group for main application pages
│   ├── _components/  # Components specific to pages in the app directory
│   └── api/          # API routes (including tRPC)
├── components/       # Shared UI components (using shadcn/ui)
├── lib/              # Library functions and utilities (auth, db, etc.)
├── server/           # Server-side code, including tRPC router definition
├── styles/           # Global styles
├── trpc/             # tRPC client-side setup
└── types/            # TypeScript type definitions
```

## 📜 Available Scripts

In the project directory, you can run:

- `pnpm dev`: Runs the app in development mode.
- `pnpm build`: Builds the app for production.
- `pnpm start`: Starts a production server.
- `pnpm lint`: Lints the codebase.
- `pnpm format:write`: Formats the code with Prettier.
- `pnpm db:generate`: Creates a new migration based on schema changes.
- `pnpm db:push`: Pushes the Prisma schema state to the database without migrations.
- `pnpm db:studio`: Opens Prisma Studio to view and edit data.

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
