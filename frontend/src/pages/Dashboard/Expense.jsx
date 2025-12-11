import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Model from '../../components/Model';
import toast from 'react-hot-toast';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

function Expense() {
  useUserAuth();

  const [ expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

   
    const fetchExpenseDetails = async () => {
      if (loading) return;
      setLoading(true);
  
      try{
        const response = await axiosInstance.get(
          `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
        );
  
        if (response.data) {
          setExpenseData(response.data);
        }
      } catch (error) {
        console.log("Something went wrong. Please try again.",error);
      } finally {
        setLoading(false);
      }
    };
  
   
    const handleAddExpense = async (expense) => {
      const { category, amount, date, icon } = expense;
  
      if(!category.trim()){
        toast.error("Category is required.");
        return;
      }
      
      if(!amount || isNaN(amount) || Number(amount) <= 0) {
         toast.error("Amount should be a valid number greater than 0.")
         return;
      }
  
      if(!date){
        toast.error("Date is required.");
        return;
      }
  
      try{
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
          category,
          amount,
          date,
          icon,
        });
  
        setOpenAddExpenseModal(false);
        toast.success("Expense added successfully");
        fetchExpenseDetails();
      } catch (error) {
        console.error(
          "Error adding expense:",
          error.response?.date?.message || error.message
        );  
      }
    };


       
const deleteExpense = async (id) => {
  try {
    
    await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
      },
    });

    
    setOpenDeleteAlert({ show: true, data: id });

    
    toast.success("Expense details deleted successfully");

    
    fetchExpenseDetails();
  } catch (error) {
    console.error(
      "Error deleting expense:",
      error.response?.data?.message || error.message
    );
    toast.error(error.response?.data?.message || 'Failed to delete expense');
  }
};


   
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType:"blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:",error);
      toast.error("Failed to download expense details. Please try again,");
    }
  };


    useEffect(() => {
      fetchExpenseDetails();

      return () => {

      };
    }, []);


  return (
    <DashboardLayout activeMeanu='Expense'>
      <div className='my-5 mx-auto'>
         <div className=''>
            <div className=''>
               <ExpenseOverview
                  transactions={expenseData}
                  onExpenseIncome={() => setOpenAddExpenseModal(true)}
                />
            </div>

            <ExpenseList  
               transactions={expenseData}
               onDelete={(id) => {
                setOpenDeleteAlert({ show: true, date: id})
               }}
               onDownload={handleDownloadExpenseDetails}
            />   
         </div>

         <Model
           isOpen={openAddExpenseModal}
           onClose={() => setOpenAddExpenseModal(false)}
           title="Add Expense"
          >
            <AddExpenseForm onAddExpense={handleAddExpense} /> 
          </Model> 

          <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, date: null})}
          title="Delete Expense"
        >
          <DeleteAlert 
            content="Are you sure you wnat to delete this expense details?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Model>
      </div>
    </DashboardLayout>  
  )
}

export default Expense
