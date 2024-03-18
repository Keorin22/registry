import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

interface FormValues {
  selection: string;
  examination: string;
  date: Date | null;
}

const options = ['Option 1', 'Option 2', 'Option 3'];

export const MyForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    selection: '',
    examination: '',
    date: null,
  });

  const [list, setList] = useState<string[]>([]);

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      selection: event.target.value,
    });
  };

  const handleExaminationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      examination: event.target.value,
    });
  };
  const handleDateChange = (date: Date | null) => {
    setFormValues({
      ...formValues,
      date,
    });
  };

  const handleAddToList = () => {
    const formattedDate = formValues.date ? format(formValues.date, 'dd.MM.yyyy HH:mm') : '';
    setList([...list, `${formValues.selection}  ${formValues.examination} - ${formattedDate}`]);
    setFormValues({ selection: '', examination: '', date: null });
  };

  return (
    <form>
      <div style={{ display: 'inline-block' }}>
        <label>
          Selection:
          <select value={formValues.selection} onChange={handleSelectionChange}>
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <input 
      style={{ display: 'inline-block', marginLeft: '10px' }}
      onChange={handleExaminationChange}
      value={formValues.examination}
      >
      </input>
      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        <label>
          Date and Time:
          <DatePicker
            selected={formValues.date}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy hh:mm"
          />
        </label>
      </div>
      <button type="button" onClick={handleAddToList}>
        Add to list
      </button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </form>
  );
};

