import { useState, useEffect } from "react";
import CustomButton from "../../global/CustomButton";
import { CiImport } from "react-icons/ci";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { MdMoreVert } from "react-icons/md";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUploader from "@/utils/FileUploader";
import CustomText from "@/components/global/CustomText";
import {
  getUserPreferences,
  saveUserPreferences,
} from "@/services/CookieManager";
import { IoShareSocialOutline } from "react-icons/io5";
import CustomInput from "@/components/global/CustomInput";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import {  useSearchParams } from "react-router-dom";
import BarChartComponent from "@/components/global/charts/BarChartComponent";
import { fetchDataset } from "@/services/GetData";
import { baseUrl } from "@/constant/constant";

type Filters = {
  from: Date | undefined;
  to: Date | undefined;
  age: string;
  gender: string;
};

const SubHeader: React.FC = () => {
  // const location = useLocation();
  const [searchParams] = useSearchParams()
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isModalOpenShare, setModalOpenShare] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [copyLink, setCopyLink] = useState<string>("");

  const [dataset, setDataSet] = useState([])
  
  const [queryParams, setQueryParams] = useState({
    age: "",
    gender: "",
    from: "",
    to: "",
  });

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  

  const [userPrefernces, setUserPrefrences] = useState<Filters>({
    from: undefined,
    to: undefined,
    age: "",
    gender: "",
  });

  
  //  Update queryParams when searchParams or refreshKey changes
   useEffect(() => {
    setQueryParams({
      age: searchParams.get("age") || "",
      gender: searchParams.get("gender") || "",
      from: searchParams.get("from") || "",
      to: searchParams.get("to") || "",
    });
  }, [searchParams]);

  // useEffect(()=>{
  //   const fetchData = async (preferences: any) => {
  //     const res = await fetchDataset(preferences);
  //     console.log(res);
  //     setDataSet(res);
  //   };

    
  // },[queryParams])


  useEffect(() => {
    const savedPreferences = getUserPreferences();
  
    // Set user preferences and date from saved preferences
    if (savedPreferences) {
      setUserPrefrences(savedPreferences);
      setDate({ from: savedPreferences.from, to: savedPreferences.to });
    }
  
    const fetchData = async (preferences: any) => {
      const res = await fetchDataset(preferences);
      console.log(res);
      setDataSet(res);
    };


    
     if (savedPreferences) {
      // Fetch data using saved preferences if queryParams is not present
      fetchData(savedPreferences);
    }
  }, []); 
  
  // //push into data int url 
  useEffect(() => {
    const params = new URLSearchParams();
  
    if (userPrefernces.age) params.append("age", userPrefernces.age.toString());
    if (userPrefernces.gender) params.append("gender", userPrefernces.gender);
    
    // Convert the Date objects to a string format (ISO or custom format)
    if (userPrefernces.from) params.append("from", userPrefernces.from.toISOString());
    if (userPrefernces.to) params.append("to", userPrefernces.to.toISOString());
  
    // Dynamically update the URL with query parameters
    window.history.pushState(
      {},
      "",
      `${location.pathname}?${params.toString()}`
    );
  
    setCopyLink(`${baseUrl}${location.pathname}?${params.toString()}`);
  
  }, [userPrefernces]);
  


  //save userpreference
  useEffect(() => {
    if (isUpdate) {
      //cookie
      saveUserPreferences(userPrefernces);
      setIsUpdate(true);
    }
  }, [isUpdate, userPrefernces]);

  

  

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleOnSelect = (selectedRange: DateRange | undefined) => {
    setIsUpdate(true);
    setDate(selectedRange);

    setUserPrefrences((prev) => ({
      ...prev,
      from: selectedRange?.from || prev.from,
      to: selectedRange?.to || prev.to,
    }));
  };

  const handleOnChangeFilterGender = (value: string) => {
    setIsUpdate(true);
    setUserPrefrences((prev) => ({ ...prev, gender: value }));
    // setFilters((prev) => ({ ...prev, gender: value }));
  };

  const handleOnChangeFilterAge = (value: string) => {
    setIsUpdate(true);
    setUserPrefrences((prev) => ({ ...prev, age: value }));
    // setFilters((prev) => ({ ...prev, age: value }));
  };

  //share
  const toggleModalShare = () => {
    setModalOpenShare(!isModalOpenShare);
  };

  //copy link
  const handleOnCopyLink = (link: string) => {
    // Check if Clipboard API is supported
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          console.log(`Link copied to clipboard: ${link}`);
          toast.success("Link copied to clipboard");
          setModalOpenShare(false);
        })
        .catch((err) => {
          console.error("Failed to copy the link: ", err);
        });
    } else {
      // Fallback for browsers that do not support the Clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = link;
      textArea.style.position = "fixed"; // Prevent scrolling to bottom
      textArea.style.left = "-9999px"; // Keep it off-screen
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        console.log(`Link copied to clipboard: ${link}`);
        toast.success("Link copied to clipboard");
        setModalOpenShare(false);
      } catch (err) {
        console.error("Failed to copy the link: ", err);
      }
      document.body.removeChild(textArea);
    }
  };


  const onSearch =async()=>{
    console.log(userPrefernces)
    const l = await fetchDataset(userPrefernces)
    console.log(l)
    setDataSet(l)
  }

  return (
    <>
    <div className="w-full flex lg:items-center justify-between p-4 bg-gray-100 dark:bg-gray-400">
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-center gap-y-3 lg:gap-x-2">
        <div className="w-full flex justify-center lg:justify-end items-center gap-x-3">
          <Select
            value={userPrefernces.age}
            onValueChange={(value) => handleOnChangeFilterAge(value)}
          >
            <SelectTrigger className="w-full lg:w-[125px] dark:bg-card dark:text-card-foreground">
              <SelectValue placeholder="Age" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup >
                <SelectLabel>Age</SelectLabel>
                <SelectItem value="15-25">15-25</SelectItem>
                <SelectItem value=">25">&gt;25</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={userPrefernces.gender}
            onValueChange={(value) => handleOnChangeFilterGender(value)}
          >
            <SelectTrigger className="w-full lg:w-[150px] dark:bg-card dark:text-card-foreground">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gender</SelectLabel>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full lg:w-auto flex gap-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-full lg:w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {userPrefernces?.from ? (
                  userPrefernces.to ? (
                    <>
                      {format(userPrefernces.from, "LLL dd, y")} -{" "}
                      {format(userPrefernces.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(userPrefernces.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={userPrefernces?.from}
                selected={date}
                onSelect={handleOnSelect}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <CustomButton
          text="Search"
          onClick={()=>onSearch()}
          iconLeft={<CiImport />}
          className=" flex px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none dark:bg-card dark:text-card-foreground"
        />

          {/* //more  */}
          <div className="flex lg:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <MdMoreVert />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 flex flex-col gap-y-2">
                <CustomButton
                  text="Import"
                  onClick={toggleModal}
                  iconLeft={<CiImport />}
                  className=" lg:flex px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                />
                <CustomButton
                  text="Share"
                  onClick={toggleModalShare}
                  iconLeft={<IoShareSocialOutline />}
                  className=" lg:flex px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        

        <CustomButton
          text="Import"
          onClick={toggleModal}
          iconLeft={<CiImport />}
          className="hidden lg:flex px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none dark:bg-card dark:text-card-foreground"
        />
        <CustomButton
          text="Share"
          onClick={toggleModalShare}
          iconLeft={<IoShareSocialOutline />}
          className="hidden lg:flex px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none dark:bg-card dark:text-card-foreground"
        />
      </div>

      <button
        onClick={toggleModal}
        className="fixed hidden bottom-4 right-4 z-50 items-center justify-center w-14 h-14 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      {/* upload  */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md dark:bg-card dark:text-card-foreground dark:shadow-xl dark:shadow-white">
            <CustomText
              className="text-lg font-semibold mb-8"
              style={{ textAlign: "center", fontSize: 24 }}
            >
              Upload CSV File
            </CustomText>
            <FileUploader />
            <div className="flex justify-end space-x-2">
              <CustomButton
                text="Cancel"
                onClick={toggleModal}
                className="px-4 py-2 mt-5 bg-red-500  dark:bg-red-900 rounded-md hover:bg-red-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* //share  */}

      {isModalOpenShare && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md dark:bg-card dark:text-card-foreground dark:shadow-xl dark:shadow-white">
            <CustomText
              className="text-lg font-semibold mb-8"
              style={{ textAlign: "center", fontSize: 24 }}
            >
              Share link with other
            </CustomText>
            <div className="flex justify-between items-center gap-x-2">
              <CustomInput
                style={{ width: 290 }}
                type="text"
                value={copyLink}
                className="dark:bg-gray-200 dark:text-black"
                iconLeft={
                  <>
                    <MdContentCopy size={24} className="dark:text-black" />
                  </>
                }
              />
              <CustomButton
                text="Copy Link"
                onClick={() => handleOnCopyLink(copyLink)}
                className=" w-full px-4 py-3 text-sm bg-blue-500 dark:bg-blue-900 rounded-md hover:bg-blue-600 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <CustomButton
                text="Cancel"
                onClick={toggleModalShare}
                className="px-4 py-2 mt-5 bg-red-500 dark:bg-red-900 rounded-md hover:bg-red-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>

    <BarChartComponent data={dataset} />

    </>
  );
};

export default SubHeader;
