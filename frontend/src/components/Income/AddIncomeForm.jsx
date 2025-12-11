

import React, { useState } from 'react';
import Input from '../inputs/input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const [error, setError] = useState({
    source: "", // Error for source input
  });

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });

    // Clear error if user starts typing in the source field
    if (key === "source" && value) {
      setError({ ...error, source: "" });
    }
  };

  const handleSubmit = () => {
    // Check if source is empty and show an error
    if (!income.source) {
      setError({ ...error, source: "Source is required!" });
      return;
    }

    // Call onAddIncome if all fields are valid
    onAddIncome(income);
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      
      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />
      {error.source && <p className="text-red-500 text-sm">{error.source}</p>} {/* Show error message for source */}

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit} // Use handleSubmit to validate and add income
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;

