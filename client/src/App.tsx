import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HolidayTable from "./components/HolidayTable";
import ApprovedHolidayTable from "./components/ApprovedHolidayTable";
import TopSection from "./components/TopSection";
import { useQuery } from "@tanstack/react-query";

interface Holiday {
  id: number;
  date: string;
  day: string;
  occasion: string;
  approve_disapprove: boolean;
}

const App: React.FC = () => {
  const tabs: string[] = ["Holidays", "Approved Holidays"];
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [approvedHolidays, setApprovedHolidays] = useState<Holiday[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("digitalIpsum");
  const navigate = useNavigate();

  const companyList: string[] = [
    "delhiDeli",
    "corrianderLeaf",
    "myanmarGoldenHeart",
    "globalPulse",
    "PLGlobalImpex",
    "cyberDolphins",
    "shivaShakti",
    "vimpexLimited",
    "encourageToThrive",
    "digitalIpsum",
    "RPComtrade",
  ];

  const fetchHolidaysByCompany = async () => {
    const response = await fetch(`http://localhost:8000/holidays/company/${selectedCompany}`);
    if (!response.ok) {
      const errorData = await response.json();
      const error: any = new Error(
        "An Error occurred while checking if the company is present or not present."
      );
      error.code = response.status;
      error.info = errorData;
      throw error;
    }
    const resData = await response.json();
    return resData;
  };

  const { data, isLoading, isRefetching, isError, error, refetch } = useQuery({
    queryKey: ["fetchHolidaysByCompany", { selectedCompany }],
    queryFn: fetchHolidaysByCompany,
    gcTime: 0,
    staleTime: Infinity,
  });

  const handleSelectTab = (tab: string) => {
    setSelectedTab(tab);
    navigate(tab === "Holidays" ? "/" : "/approved");
  };

  useEffect(() => {
    if (!isLoading || !isRefetching) {
      setHolidays(data);
      setApprovedHolidays(
        data?.filter((holiday: Holiday) => holiday.approve_disapprove)
      );
    }
  }, [isLoading, isRefetching, data]);

  return (
    <div className="bg-gray-100 min-h-[100vh]">
      <div className="mx-auto max-w-screen-lg">
        <TopSection selectedCompany={selectedCompany} />
        <Navbar
          tabs={tabs}
          selectedTab={selectedTab}
          onSelectTab={handleSelectTab}
          companyList={companyList}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          fetchHolidays={fetchHolidaysByCompany}
          refetch={refetch}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HolidayTable
                holidays={
                  selectedTab === "Holidays" ? holidays : approvedHolidays
                }
                fetchHolidays={fetchHolidaysByCompany}
                refetch={refetch}
              />
            }
          />
          <Route
            path="/approved"
            element={<ApprovedHolidayTable holidays={approvedHolidays} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
