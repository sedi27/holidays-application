import React from 'react';
import moment from 'moment';

interface Holiday {
    id: number;
    date: string;
    day: string;
    occasion: string;
    approve_disapprove: boolean;
}

interface ApprovedHolidayTableProps {
  holidays: Holiday[];
}

const ApprovedHolidayTable: React.FC<ApprovedHolidayTableProps> = ({ holidays }) => {


  return (
    <div className="mt-5 mx-auto">
      <div className="grid grid-cols-1 gap-4">
        {holidays.map((holiday) => (
          <div key={holiday.id} className="bg-white p-4 rounded-md w-full pl-16 py-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                {moment(holiday.date).format('MMM DD, YYYY')}
              </div>
              <div>
                {holiday.day}
              </div>
              <div>
                {holiday.occasion}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedHolidayTable;
