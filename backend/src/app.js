import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import categoryRoutes from './routes/category.route.js';
import expenseRoutes from './routes/expense.route.js';
import budgetRoutes from './routes/budget.route.js';
import analyticsRoutes from './routes/analytic.route.js';
import dashboardRoutes from './routes/dashboard.route.js';
import incomeRoutes from './routes/income.route.js';
import transactionRoutes from "./routes/transaction.route.js";
import securityRoutes from './routes/security.route.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200
}));

app.use(express.static('public'));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Route handlers
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/budgets', budgetRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/incomes', incomeRoutes);
app.use('/api/v1/transactions', transactionRoutes);

// Security demonstration routes (conditional based on environment)
if (process.env.ENABLE_SECURITY_DEMOS !== 'false') {
    app.use('/api/v1/security', securityRoutes);
    console.log('🔓 Security demonstration endpoints enabled');
}

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
