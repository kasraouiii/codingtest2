'use client'
import React  from 'react';
import axios from 'axios';

export default function DateCalculator() {
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [daysDifference, setDaysDifference] = React.useState<number | null>(null);

  React.useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await axios.get('http://localhost:3001/getDates');
        if (response.data.startDate) {
          setStartDate(new Date(response.data.startDate));
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    }

    fetchInitialData();
  }, []);

  const handleCalculateDays = () => {
    if (startDate && endDate && startDate < endDate) {
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
      setDaysDifference(differenceInDays);
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Date de début</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={startDate ? startDate.toISOString().split('T')[0] : ''}
          onChange={(e) => setStartDate(new Date(e.target.value))}
          max={endDate?.toISOString().split('T')[0]}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Date de fin</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={endDate ? endDate.toISOString().split('T')[0] : ''}
          onChange={(e) => setEndDate(new Date(e.target.value))}
          min={startDate?.toISOString().split('T')[0]}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleCalculateDays}
        disabled={startDate?.getTime()==endDate?.getTime() || endDate===null}
      >
        Calculer la différence
      </button>
      {daysDifference !== null && startDate?.getTime()!=endDate?.getTime() && (
        <p className="mt-4 text-gray-700">
          Nombre de jours entre les dates : {daysDifference}
        </p>
      )}
    </div>
  );
}
