A. How to run (requires NodeJS and NPM):
  1) Install dependencies with "npm i";
  2) Execute the script "npm run dev";
  3) Open browser at "http://localhost:3000";
  4) To run all tests, execute the script "npm run tests".

B. Frameworks/Libraries used:
  1) NextJS for application (provides backend with React as frontend);
  2) TailwindCSS for styling;
  3) Jest and React Testing Library for unit testing;
  4) Prisma as an ORM, with Heroku PostgreSQL database.

Note: as deployment was made on Vercel, every API has a time limit of 5 seconds. So in order to compute big numbers (approximately >=10^6), run the app in development environment.