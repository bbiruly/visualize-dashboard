import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { seedDb } from '@/services/SeedDb';
import CustomInput from '@/components/global/CustomInput';
import { GoFile } from "react-icons/go";
import { Check, Loader } from 'lucide-react';

interface FileData {
  [key: string]: string | number;
}

const FileUploader: React.FC = () => {
  const [fileData, setFileData] = useState<FileData[]>([]);
  const [isUploading, setIsUpLoading] =useState<boolean>(false)
  const [isSuccess, setIsSuccess] =useState<boolean>(false)

  useEffect(() => {
    if (fileData.length) {
        setIsUpLoading(true)
        //seed data
      seedDb({ data: fileData });
      setIsUpLoading(false)
      setIsSuccess(true)
    }
  }, [fileData]);


  

  

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result;

        if (fileExtension === 'xlsx' || fileExtension === 'xls') {
          const workbook = XLSX.read(fileContent, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
         
          const sheet = workbook.Sheets[sheetName];
          
          const jsonData: FileData[] = XLSX.utils.sheet_to_json(sheet, {
            dateNF: 'yyyy-mm-dd' // Adjust the date format as needed
          });
          setFileData(jsonData);
        } else if (fileExtension === 'csv') {
          if (typeof fileContent === 'string') {
            Papa.parse(fileContent, {
              header: true,
              skipEmptyLines: true,
              complete: (result) => {
                setFileData(result.data as FileData[]);
              },
            });
          }
        } else {
          alert('Unsupported file format. Please upload an Excel or CSV file.');
        }
      };

      if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        reader.readAsBinaryString(file);
      } else if (fileExtension === 'csv') {
        reader.readAsText(file);
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
        
      {/* <CustomText className='font-bold' style={{fontSize: 16}}>Upload Excel or CSV File</CustomText> */}
      <CustomInput 
      type="file" 
      accept=".csv, .xlsx, .xls" 
      onChange={handleFileUpload} 
      iconLeft={<><GoFile size={24} className='mt-2 dark:text-black'/></>}
      className='mt-3 dark:bg-gray-200 dark:text-black'
      />

      {
        isUploading && (
            <div className='w-full m-4 flex justify-center items-center bg-yellow-100 gap-x-6 rounded-md'>
                <Loader size={24}/>
                <span>Uploading...</span>
            </div>
        )
      }
      {
        isSuccess && (
            <div className='w-full m-4 p-2 flex justify-center items-center bg-green-100 gap-x-6 rounded-md'>
                <Check size={24}/>
                <span>Files Imported Successfully!</span>
            </div>
        )
      }
      
    </div>
  );
};

export default FileUploader;
