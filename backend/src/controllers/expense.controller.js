{ /* import { Expense } from "../models/expense.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addExpense = asyncHandler(async (req,res) => {
     try {
        const { user, amount, date, description, category} = req.body;
        const expense = await Expense.create({ user, amount, date, description, category});
        res.status(201).json({message:'Expense added successfully',expense_id:expense._id})
     } catch (err) {
        res.status(500).json({message:"Error adding expense",error:err.message});
     }
});


export const getExpense = asyncHandler(async (req,res) => {
    try {
        const expenses = await Expense.find({ user: req.params.user}).populate('category_id', 'name type');
        res.json(expenses);
        
    } catch (err) {
        res.status(500).json({message: "Error fetching expense",error:err.message});
    }
});


export const deleteExpense = asyncHandler(async (req, res) => {
    try {
      const { expense_id } = req.params;
  
      // Validate expense_id
      if (!expense_id) {
        return res.status(400).json({
          status: "error",
          message: "Expense ID is required",
        });
      }
  
      // Find and delete the expense
      const deletedExpense = await Expense.findOneAndDelete({
        _id: expense_id,
        user: req.user._id, 
      });
  
      // Check if the expense exists
      if (!deletedExpense) {
        return res.status(404).json({
          status: "error",
          message: "Expense not found or not authorized to delete",
        });
      }
  
      // Respond with success
      res.status(200).json({
        status: "success",
        message: "Expense deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Error deleting expense",
        error: err.message,
      });
    }
  });

 
  import xlsx from "xlsx";
  import path from "path";
  import { fileURLToPath } from "url";
  
  
  // Fix __dirname for ES Modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  export const downloadExpenseExcel = asyncHandler(async (req, res) => {
      const userId = req.user.id; 
  
      try {
          const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
  
          // Prepare data for Excel
          const data = expenses.map((item) => ({
              Description: item.description,
              Amount: item.amount,
              Category: item.category,
              Date: item.date,
          }));
  
          // Create Excel file
          const wb = xlsx.utils.book_new();
          const ws = xlsx.utils.json_to_sheet(data);
          xlsx.utils.book_append_sheet(wb, ws, "Expenses");
  
          // Define file path
          const filePath = path.join(__dirname, "../data/expenses.xlsx");
  
          // Write the Excel file
          xlsx.writeFile(wb, filePath);
  
          // Send the file as a download
          res.download(filePath, "expenses.xlsx", (err) => {
              if (err) {
                  console.error("Error downloading file:", err);
                  res.status(500).json({ message: "File download failed", error: err.message });
              }
          });
      } catch (error) {
          res.status(500).json({ message: "Server Error", error: error.message });
      }
  });
   
  */ }

import { Expense } from "../models/expense.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import XlsxPopulate from "xlsx-populate";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addExpense = asyncHandler(async (req, res) => {
    try {
        const { amount, date, description, category } = req.body;
        const expense = await Expense.create({ user: req.user._id, amount, date, description, category });
        res.status(201).json({ message: 'Expense added successfully', expense_id: expense._id });
    } catch (err) {
        res.status(500).json({ message: "Error adding expense", error: err.message });
    }
});

export const getExpense = asyncHandler(async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user._id }).populate('category', 'name type');
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: "Error fetching expense", error: err.message });
    }
});

export const deleteExpense = asyncHandler(async (req, res) => {
    try {
        const { expense_id } = req.params;

        if (!expense_id) {
            return res.status(400).json({
                status: "error",
                message: "Expense ID is required",
            });
        }

        const deletedExpense = await Expense.findOneAndDelete({
            _id: expense_id,
            user: req.user._id,
        });

        if (!deletedExpense) {
            return res.status(404).json({
                status: "error",
                message: "Expense not found or not authorized to delete",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Expense deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error deleting expense",
            error: err.message,
        });
    }
});

export const downloadExpenseExcel = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const expenses = await Expense.find({ user: userId }).sort({ date: -1 });

        // Create a new workbook
        const workbook = await XlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet(0);

        // Set headers
        sheet.cell("A1").value("Description");
        sheet.cell("B1").value("Amount");
        sheet.cell("C1").value("Category");
        sheet.cell("D1").value("Date");

        // Add data rows
        expenses.forEach((item, index) => {
            const row = index + 2;
            sheet.cell(`A${row}`).value(item.description);
            sheet.cell(`B${row}`).value(item.amount);
            sheet.cell(`C${row}`).value(item.category);
            sheet.cell(`D${row}`).value(new Date(item.date).toLocaleDateString("en-US"));
        });

        const filePath = path.join(__dirname, "../data/expenses.xlsx");

        // Write the file
        await workbook.toFileAsync(filePath);

        res.download(filePath, "expenses.xlsx", (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ message: "File download failed", error: err.message });
            } else {
                fs.unlinkSync(filePath); // Delete file after download
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});