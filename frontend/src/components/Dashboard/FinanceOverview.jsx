import React from 'react';
import CustomPieChart from '../charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"]

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expense", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ];
//
    const sanitizeAmount = (amount) => {
        if (typeof amount === 'string') {
            return amount.replace(/[;^%$]/g, '');  
        }
        return `₹${amount.toFixed(2)}`;  
    };

    return (
        <div className='card'>
            <div className='flex item-center justify-between'>
                <h5 className='text-lg'>Finance OverView</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={sanitizeAmount(totalBalance)} 
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
}

export default FinanceOverview;
