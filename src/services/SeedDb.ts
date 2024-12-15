import { api } from "@/constant/constant";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";

type FileData = {
  [key: string]: string | number;
};

type Dataset = {
  data: FileData[];
};

export const seedDb = async ({ data }: Dataset): Promise<void> => {
  try {
    // Assuming the file has the columns: Day, Age, Gender, A, B, C, D, E, F
    // Map the data to the expected structure
    const mappedData = data.map((item) => {
      const date = item.Day ? item.Day.split("/").join("-") : ""
      return {
        Day: moment(date,"DD-MM-YYYY").valueOf(), 
        Age: item.Age,
        Gender: item.Gender,
        A: item.A,
        B: item.B,
        C: item.C,
        D: item.D,
        E: item.E,
        F: item.F,
      };
    });

    // Use Promise.all for parallel processing
    const promises = mappedData.map((record) =>
      axios.post(`${api}/data/datasets`, record)
    );

    // Await all promises
    const results = await Promise.all(promises);

    // Log a success message
    toast.success(`Successfully added ${results.length} records.`);
    
  } catch (error) {
    toast.error("Error seeding the database:", error?.response?.data?.message || error.message || error);

    // Optionally, log detailed info about failed records
    if (axios.isAxiosError(error) && error.response) {
      console.error("Server responded with:", error.response.data);
      toast.error(`Server responded with: ${error.response.data}`);
    }
  }
};
