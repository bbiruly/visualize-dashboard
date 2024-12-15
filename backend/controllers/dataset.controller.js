import { Dataset } from "../models/data.model.js";
import moment from "moment/moment.js";


// Create a new dataset
export const createDataset = async (req, res) => {
    try {
        const dataset = await Dataset.create(req.body);
        res.status(201).json({ success: true, data: dataset });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all datasets
export const getAllDatasets = async (req, res) => {
    try {
        const datasets = await Dataset.find();
        res.status(200).json({ success: true, dataset: datasets });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single dataset by ID
export const getDatasetById = async (req, res) => {
    try {
        const dataset = await Dataset.findById(req.params.id);
        if (!dataset) {
            return res.status(404).json({ success: false, message: "Dataset not found" });
        }
        res.status(200).json({ success: true, data: dataset });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a dataset by ID
export const updateDataset = async (req, res) => {
    try {
        const dataset = await Dataset.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Validate the update against the model schema
        });
        if (!dataset) {
            return res.status(404).json({ success: false, message: "Dataset not found" });
        }
        res.status(200).json({ success: true, data: dataset });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a dataset by ID
export const deleteDataset = async (req, res) => {
    try {
        const dataset = await Dataset.findByIdAndDelete(req.params.id);
        if (!dataset) {
            return res.status(404).json({ success: false, message: "Dataset not found" });
        }
        res.status(200).json({ success: true, message: "Dataset deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


//FILTER THE DATA ACCORDING TO AGE , GENDER AND DATE RANGE
export const getFilteredData = async (req, res) => {
  try {
    // Extract query parameters
    const { age, gender, from, to } = req.query;

    // Convert the 'from' and 'to' date strings (e.g., '04-10-2022') into numeric timestamps
    const fromDate = moment(from,"DD-MM-YYYY").valueOf() ;
    const toDate = moment(to,"DD-MM-YYYY").valueOf();

    // console.log(fromDate, toDate)

    // Build the filter object
    let filter = {};

    if (age) {
      filter.Age = age; 
    }

    if (gender) {
      filter.Gender = gender; 
    }

    // Apply date range filtering if 'from' and 'to' are provided
    if (fromDate && toDate) {
      filter.Day = { $gte: fromDate, $lte: toDate }; 
    } else if (fromDate) {
      filter.Day = { $gte: fromDate }; 
    } else if (toDate) {
      filter.Day = { $lte: toDate }; 
    }

    // Fetch filtered data from the database
    const result = await Dataset.find(filter);


    // Return the filtered data
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching data.",
    });
  }
};

  
