import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarInterface {
  tabs: string[];
  selectedTab: string;
  onSelectTab: (tab: string) => void;
  companyList: string[];
  setSelectedCompany: React.Dispatch<React.SetStateAction<string>>;
  selectedCompany: string;
  fetchHolidays: () => Promise<void>;
  refetch: any
}

const Navbar: React.FC<NavbarInterface> = ({ tabs, selectedTab, onSelectTab, companyList, setSelectedCompany, selectedCompany, fetchHolidays, refetch }) => {
  return (
    <div className="ml-2">
      <ul className="flex space-x-8 pb-2">
        {tabs?.map((tab) => (
          <li key={tab} className="pb-1 cursor-pointer">
            <Link 
              to={tab === 'Holidays' ? '/' : '/approved'} 
              className={tab === selectedTab ? 'border-b-2 border-black' : ''} 
              onClick={() => onSelectTab(tab)}
            >
              {tab}
            </Link>
          </li>
        ))}
      </ul>

      <div className="ml-[-8px] mb-[-10px]">
        <select 
          value={selectedCompany} 
          onChange={(e) => {
            const newCompany = e.target.value;
            setSelectedCompany(newCompany);
            refetch();
          }}
          className="p-1"
        >
          {companyList?.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Navbar;
