# Mind Wave Connect

A platform for sharing and discovering ideas, thoughts, and "brainwaves" from a community of creative minds.

## Features

- User authentication and profiles
- Create, read, update, and delete brainwaves
- Like and comment on brainwaves
- Search and filter brainwaves
- Category-based organization
- Public vs private brainwaves

## New Enhanced Features

- **Categories API**: Get all available categories or filter by category
- **Trending Brainwaves**: Get most liked brainwaves
- **Advanced Search**: Filter by keyword, category, tags, and date range
- **User Brainwaves**: Get brainwaves by specific user
- **Improved Pagination**: Better control over page size and sorting

## API Endpoints

### Authentication
- `POST /api/users/login` - User login
- `POST /api/users` - Register new user
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update user profile (requires auth)

### Brainwaves
- `GET /api/brainwaves` - Get all brainwaves
- `POST /api/brainwaves` - Create new brainwave (requires auth)
- `GET /api/brainwaves/:id` - Get brainwave by ID
- `PUT /api/brainwaves/:id` - Update brainwave (requires auth)
- `DELETE /api/brainwaves/:id` - Delete brainwave (requires auth)
- `POST /api/brainwaves/:id/comments` - Add comment (requires auth)
- `PUT /api/brainwaves/:id/like` - Like/unlike brainwave (requires auth)

### Enhanced Brainwave Features
- `GET /api/extra/categories` - Get all brainwave categories
- `GET /api/extra/category/:category` - Get brainwaves by category
- `GET /api/extra/trending` - Get trending brainwaves
- `GET /api/extra/user/:userId` - Get brainwaves by user

## Setup

1. Clone the repository
2. Install dependencies: `npm install` or `bun install`
3. Setup MongoDB:
   - Install MongoDB Community Edition on your system
   - Create the data directory: `md \data\db` (on Windows)
   - Start MongoDB service: `net start MongoDB` (on Windows)
4. Create a `.env` file with the following:
   ```
   MONGODB_URI=mongodb://localhost:27017/mindwave
   JWT_SECRET=your-secret-key
   PORT=5000
   NODE_ENV=development
   ```
5. Run the application:
   - Backend: `npm run dev:server`
   - Frontend: `npm run dev:client`
   - Both: `npm run dev:all`

## Development

- The backend runs on port 5000 by default
- The frontend runs on port 5173 by default (Vite default)
- Use `npm run dev:all` to run both simultaneously
- Use `npm run build` to build for production

## Technologies Used

- Node.js & Express.js (Backend)
- React & TypeScript (Frontend)
- MongoDB & Mongoose (Database)
- Vite (Build tool)
- Tailwind CSS (Styling)
- bcryptjs (Password hashing)
- jwt (Authentication)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
