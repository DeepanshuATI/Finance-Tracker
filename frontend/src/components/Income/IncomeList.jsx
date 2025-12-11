import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../cards/TransactionInfoCard';
import moment from 'moment';

const IncomeList = ({ transactions = [], onDelete, onDownload }) => {
  // transactions must be array
  const validTransactions = Array.isArray(transactions) ? transactions : [];

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Income Sources</h5>

        <button className='card-btn' onClick={onDownload}>
          <LuDownload className='text-base' /> Download
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {validTransactions.length > 0 ? (
          validTransactions.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))
        ) : (
          <p className='text-gray-500 text-sm col-span-2'>No income sources found.</p>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
