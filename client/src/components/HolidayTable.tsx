import React, { useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';

interface Holiday {
  id: number;
  date: string;
  day: string;
  occasion: string;
  approve_disapprove: boolean;
}

interface HolidayTableProps {
  holidays: Holiday[];
  fetchHolidays: () => Promise<void>;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>; // Update refetch prop type
}

const HolidayTable: React.FC<HolidayTableProps> = ({ holidays, fetchHolidays, refetch }) => {
  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  const handleCheckboxToggle = async (id: number, currentStatus: boolean) => {
    try {
      await axios.get(`http://localhost:8000/holidays/update/${id}`);
      await refetch();
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };

  const isApprovedRoute = window.location.pathname === '/approved';

  return (
    <div className="mx-auto mt-5">
      <div className="grid grid-cols-1 gap-4">
        {holidays?.map((holiday) => (
          <div key={holiday.id} className="bg-white p-4 rounded-md w-full pl-16 py-6">
            <div className="grid grid-cols-4 gap-4">
              <div className={isApprovedRoute ? 'w-full text-center' : ''}>
                {moment(holiday.date).format('MMM DD, YYYY')}
              </div>
              <div className={isApprovedRoute ? 'w-full text-center' : ''}>
                {holiday.day}
              </div>
              <div className={isApprovedRoute ? 'w-full text-center' : ''}>
                {holiday.occasion}
              </div>
              {!isApprovedRoute && (
                <div className="text-center">
                  <input
                    type="checkbox"
                    checked={holiday.approve_disapprove}
                    onChange={() => handleCheckboxToggle(holiday.id, holiday.approve_disapprove)}
                    className="h-5 w-5"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayTable;
