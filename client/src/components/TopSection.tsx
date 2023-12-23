import React from 'react';
import Logo from "./logo.jpg"

interface TopSectionProps {
  selectedCompany: string;
}

const TopSection: React.FC<TopSectionProps> = ({ selectedCompany }) => {
  return (
    <div className="flex justify-between">
        <div className="text-[35px] text-bold mt-4">{`Holidays for 2024 - ${selectedCompany}`}</div>
        <img src={Logo} alt="Logo" className="mt-4 mr-4"/>
    </div>
  );
};

export default TopSection;
