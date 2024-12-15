import { api } from "@/constant/constant"
import axios from "axios"
import moment from "moment"



export const getData =async()=>{
    try {
        const response =  await axios.get(`${api}/data/datasets`)
        const {dataset} = response.data 
        return dataset
    } catch (error) {
        console.log("something went wrong", error.response.data.message)
    }
}



export const fetchDataset = async (queryParams: any) => {
  try {
    const response = await axios.get(`${api}/data/dataset/specific`, {
      params: {
        age: queryParams.age,
        gender: queryParams.gender,
        from: moment(queryParams.from).format("DD-MM-YYYY"),
        to: moment(queryParams.to).format("DD-MM-YYYY"),
      },
    });
    const { data, success } = response.data;
    if (success) {
      return data; // Return the data if the API call is successful
    } else {
      throw new Error("API call unsuccessful");
    }
  } catch (err) {
    console.error("API Error:", err);
    throw err; // Ensure error is propagated to React Query for error handling
  }
};
