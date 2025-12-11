{/* import Income from "../models/income.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add Income
export const addIncome = asyncHandler(async (req, res) => {
    try {
        const { icon, amount, source, date, description } = req.body;

        // Validate user
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: User not identified",
            });
        }

        // Validate required fields
        if (!source || !amount || !date) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields: source, amount, or date",
            });
        }

        // Create income
        const income = new Income({
            user: req.user._id, // Use user reference (not userId)
            icon,
            amount,
            source,
            date: new Date(date),
            description, // Adding description if passed
        });

        // Save income
        const savedIncome = await income.save();
        res.status(201).json({
            status: "success",
            message: "Income added successfully",
            data: savedIncome,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to add income",
            error: err.message,
        });
    }
});

// Get Incomes
export const getIncomes = asyncHandler(async (req, res) => {
    try {
        console.log("User:", req.user);  // Debugging line

        if (!req.user || !req.user._id) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: User not identified",
            });
        }

        const incomes = await Income.find({ user: req.user._id }).sort({ date: -1 });

        res.status(200).json({
            status: "success",
            data: incomes,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch incomes",
            error: err.message,
        });
    }
});

// Delete Income
export const deleteIncome = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.user || !req.user._id) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: User not identified",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid income ID",
            });
        }

        const income = await Income.findOne({ _id: id, user: req.user._id });
        if (!income) {
            return res.status(404).json({
                status: "error",
                message: "Income not found or not authorized to delete",
            });
        }

        await income.deleteOne();

        res.status(200).json({
            status: "success",
            message: "Income deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete income",
            error: err.message,
        });
    }
});

// Update Income
export const updateIncome = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, source, date, category, description } = req.body;

        if (!req.user || !req.user._id) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: User not identified",
            });
        }

        const income = await Income.findOne({ _id: id, user: req.user._id });
        if (!income) {
            return res.status(404).json({
                status: "error",
                message: "Income not found or not authorized to update",
            });
        }

        // Update fields
        income.amount = amount || income.amount;
        income.source = source || income.source;
        income.date = date || income.date;
        income.category = category || income.category;
        income.description = description || income.description;

        const updatedIncome = await income.save();

        res.status(200).json({
            status: "success",
            message: "Income updated successfully",
            data: updatedIncome,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to update income",
            error: err.message,
        });
    }
});

// Download Income as Excel
import xlsx from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadIncomeExcel = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ user: userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
            Description: item.description, // Include description
        }));

        // Create Excel file
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Define a proper path for the Excel file
        const filePath = path.join(__dirname, "../data/income_details.xlsx");

        // Save the file
        xlsx.writeFile(wb, filePath);

        // Send the file to the user
        res.download(filePath, "Income_details.xlsx", (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ message: "File download failed", error: err.message });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

*/}


import Income from "../models/income.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";


export const addIncome = asyncHandler(async (req, res) => {
  try {
    const { icon, amount, source, date, description } = req.body;

    // Validate user (ensure the request is authenticated)
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: User not identified",
      });
    }

    // Validate required fields
    if (!source || !amount || !date) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields: source, amount, or date",
      });
    }

    // Create income and associate it with the authenticated user
    const newIncome = new Income({
      user: req.user._id, // Associate income with the authenticated user
      icon,
      amount,
      source,
      date: new Date(date), // Ensure date is properly formatted
      description,
    });

    // Save income to the database
    const savedIncome = await newIncome.save();

    res.status(201).json({
      status: "success",
      message: "Income added successfully",
      data: savedIncome,
    });
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add income",
      error: error.message,
    });
  }
});


// Get all income entries
export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().populate("user", "username email"); // Populate with user details
    res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get income entries for a specific user
export const getUserIncomes = async (req, res) => {
  try {
    const { userId } = req.params;
    const incomes = await Income.find({ user: userId }).populate("user", "username email");
    res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a specific income entry by ID
export const getIncomeById = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findById(id).populate("user", "username email");
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json(income);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an existing income entry
export const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { icon, amount, source, date, description } = req.body;

    const updatedIncome = await Income.findByIdAndUpdate(
      id,
      { icon, amount, source, date, description },
      { new: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Income updated successfully", data: updatedIncome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an income entry
export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIncome = await Income.findByIdAndDelete(id);

    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Download Income as Excel
import XlsxPopulate from "xlsx-populate";
import path from "path";
import fs from "fs"; // Import the File System module
import { fileURLToPath } from "url";


// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadIncomeExcel = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id; // Ensure consistent use of `req.user._id`

    // Fetch income data for the user
    const incomes = await Income.find({ user: userId }).sort({ date: -1 });

    // Create a new workbook
    const workbook = await XlsxPopulate.fromBlankAsync();
    const sheet = workbook.sheet(0);

    // Set headers
    sheet.cell("A1").value("Source");
    sheet.cell("B1").value("Amount");
    sheet.cell("C1").value("Date");
    sheet.cell("D1").value("Description");

    // Add data rows
    incomes.forEach((item, index) => {
      const row = index + 2;
      sheet.cell(`A${row}`).value(item.source);
      sheet.cell(`B${row}`).value(item.amount);
      sheet.cell(`C${row}`).value(new Date(item.date).toLocaleDateString("en-US"));
      sheet.cell(`D${row}`).value(item.description);
    });

    // Define the file path
    const filePath = path.join(__dirname, "../data/income.xlsx");

    // Ensure the directory exists
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Write the file to disk
    await workbook.toFileAsync(filePath);

    // Serve the file and delete it after download
    res.download(filePath, "Income_details.xlsx", (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).json({ message: "File download failed", error: err.message });
      } else {
        fs.unlinkSync(filePath); // Clean up the file after download
      }
    });
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});








