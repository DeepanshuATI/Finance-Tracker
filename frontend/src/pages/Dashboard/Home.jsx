import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import Last30DayExpense from '../../components/Dashboard/Last30DayExpense';
//dekh lena  bhai
const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) setDashboardData(response.data);
    } catch (error) {
      console.log("Something Went Wrong! Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  const last60DaysIncomeTransactions =
    Array.isArray(dashboardData?.last60DaysIncome?.transactions)
      ? dashboardData.last60DaysIncome.transactions
      : [];
  const slicedIncomeTransactions = last60DaysIncomeTransactions.slice(0, 4);

  const last30DayExpenseTransactions =
    Array.isArray(dashboardData?.last30DaysExpense?.transactions)
      ? dashboardData.last30DaysExpense.transactions
      : [];

  const recentTransactions =
    Array.isArray(dashboardData?.recentTransactions)
      ? dashboardData.recentTransactions
      : [];

  return (
    <DashboardLayout activeMenu='Dashboard'>
      <div className='my-5 mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-400"
          />
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />
          <ExpenseTransactions
            transactions={last30DayExpenseTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DayExpense data={last30DayExpenseTransactions} />
          <RecentIncomeWithChart
            data={slicedIncomeTransactions}
            totalIncome={dashboardData?.totalIncome || 0}
          />
          <RecentIncome
            transactions={last60DaysIncomeTransactions}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
    
  );
};

export default Home;

