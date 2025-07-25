Orient-Express: Intelligent Academic & Career Guidance Platform
This project is a [T3 Stack](https://create.t3.gg/) application bootstrapped with `create-t3-app`, further developed to create a comprehensive academic and career guidance platform.

Project Overview
Orient-Express is an intelligent web platform designed to inform and guide students at IUT Douala, including prospective students. It centralizes essential data on academic programs, career opportunities, admission requirements, and training curricula, empowering both new high school graduates and current students to make informed choices through a personalized orientation process accessible to all.

While most informational content is publicly available, specific sections like "Events" and "Resources" are securely restricted to logged-in students with a valid school ID. The platform also streamlines access to administrative and pedagogical information, enhances communication between students and advisors via chat and appointment management (with advisor validation), and contributes to better academic planning. Orient-Express addresses a critical need for personalized support within the current university context, featuring a detailed student registration process for more precise guidance.

## Key Features
### For Students:
Personalized Orientation: Intelligent guidance and recommendations based on skills, interests, and academic background.

Program & Career Exploration: Detailed information on academic programs, career paths, and prerequisites.

Secure Access to Resources: Public access to general information, with restricted access to exclusive "Events" and "Resources" for authenticated students with a valid school ID.

Enhanced Registration: Comprehensive registration process capturing essential details like speciality and academicBackground upfront.

Personal Profile Management: View and update personal, academic, and contact information.

Meeting Requests: Ability to request and manage appointments with assigned advisors.

Chat with Advisors: Direct messaging functionality with assigned advisors.

### For Advisors:
Assigned Students Management: View and access profiles of all assigned students.

Meeting Request Validation: Interface to review, approve, decline, or reschedule student meeting requests.

Direct Communication: Chat functionality to communicate with assigned students.

### For Administrators:
Advisor Assignment: Dashboard to assign advisors to students.

System Oversight: High-level overview of platform activity and user statistics.

## Technologies Used
This project leverages the power of the T3 Stack alongside additional robust libraries:

Next.js (App Router): A React framework for production.

NextAuth.js: Flexible authentication for Next.js applications.

Prisma: A modern database toolkit (ORM) for Node.js and TypeScript.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

tRPC: End-to-end type-safe APIs for Next.js.

next-themes: For theme switching (light/dark mode).

framer-motion: A production-ready motion library for React.

next-intl: For internationalization (i18n) support.

shadcn/ui: Reusable UI components built with Tailwind CSS and Radix UI.

bcryptjs: For password hashing.

PostgreSQL: The relational database used.

_**Note:** While Drizzle ORM is part of the T3 Stack, this project specifically utilizes Prisma ORM for database interactions._

## Getting Started
Follow these instructions to set up and run the project locally.

### Prerequisites
Node.js (v18.x or higher recommended)

pnpm (or npm/yarn, but pnpm is used in this project's commands)

PostgreSQL database instance

### 1. Clone the Repository
   git clone <your-repository-url>
   cd Orient-Express

### 2. Install Dependencies
   pnpm install

### 3. Environment Variables
   Create a .env or .env.local file in the root of your project and add the following environment variables. Replace the placeholder values with your actual credentials.

```env
# Database

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"

# NextAuth.js

NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET_VERY_LONG_RANDOM_STRING"

# Generate a strong secret: openssl rand -base64 32 (or visit https://generate-secret.vercel.app/32)

# Google Provider (Optional, if enabled in authOptions)

GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

# GitHub Provider (Optional, if enabled in authOptions)

GITHUB_CLIENT_ID="YOUR_GITHUB_CLIENT_ID"
GITHUB_CLIENT_SECRET="YOUR_GITHUB_CLIENT_SECRET"

# Supabase (Only if you chose SupabaseAdapter in authOptions, otherwise remove)
```

# NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"

# SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"

**Important:** The `NEXTAUTH_SECRET` is crucial for session security. Generate a strong, random string for it.

### 4. Database Setup
   Apply your Prisma schema to your PostgreSQL database and generate the Prisma client.

```bash
npx prisma migrate dev --name init_project_schema # Use 'init_project_schema' for the first migration, or a descriptive name if you already have migrations
npx prisma generate
```

### 5. Add shadcn/ui Components
   If you encounter "Module not found" errors for shadcn/ui components (e.g., scroll-area, avatar, sonner), you need to add them to your project using the shadcn/ui CLI:

```bash
npx shadcn-ui@latest add <component-name> # e.g., npx shadcn-ui@latest add scroll-area
```

### 6. Run the Development Server
   ```bash
pnpm run dev
```

The application should now be running at http://localhost:3000.

## Project Structure (Key Folders)
- `src/app`: Next.js App Router routes (pages, API routes, layouts).

- `src/app/(auth)`: Authentication-related pages (sign-in, sign-up, error).

- `src/app/(pages)`: Main application pages (home, dashboard, profile, events, resources, orientation).

- `src/app/api/auth/[...nextauth]`: NextAuth.js API route handlers.

- `src/components`: Reusable React components.

- `src/components/providers`: React Context providers (Auth, Theme, tRPC).

- `src/components/ui`: shadcn/ui components.

- `src/components/shared/Nav`: Navbar and related navigation components.

- `src/lib`: Utility functions, Prisma client instance, NextAuth.js configuration (`auth.ts`).

- `src/styles`: Global CSS.

- `src/types`: Custom TypeScript type declarations (e.g., `next-auth.d.ts`).

- `src/i18n.ts`: `next-intl` configuration.

- `messages/`: Translation files (e.g., `en.json`, `fr.json`).

- `middleware.ts`: Next.js middleware for authentication and internationalization.

## Learn More about the T3 Stack
To learn more about the T3 Stack, take a look at the following resources:

- [Documentation](https://create.t3.gg/)

- [Learn the T3 Stack](https://create.t3.gg/en/introduction)

- [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app)

## How do I deploy this?
Follow the deployment guides for the T3 Stack:

- [Vercel](https://create.t3.gg/en/deployment/vercel)

- [Netlify](https://create.t3.gg/en/deployment/netlify)

- [Docker](https://create.t3.gg/en/deployment/docker)

## Contributing
Contributions are welcome! Please follow standard Git/GitHub practices:

1. Fork the repository.

2. Create a new branch (`git checkout -b feature/your-feature-name`).

3. Make your changes.

4. Commit your changes (`git commit -m 'feat: Add new feature'`).

5. Push to the branch (`git push origin feature/your-feature-name`).

6. Open a Pull Request.

## License
This project is open-source and available under the [MIT License](LICENSE).
