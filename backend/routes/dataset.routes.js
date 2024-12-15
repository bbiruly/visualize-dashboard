import express from 'express';
import { createDataset, deleteDataset, getAllDatasets, getDatasetById, getFilteredData, updateDataset } from '../controllers/dataset.controller.js';
import { isAuthenticated } from '../middleware/auth.js';


const router = express.Router();

// Route to create a new dataset
router.post('/datasets', createDataset);

// Route to get all datasets
router.get('/datasets', getAllDatasets);

// Route to get a dataset by ID
router.get('/datasets/:id', getDatasetById);

// Route to update a dataset by ID
router.put('/datasets/:id', updateDataset);

// Route to delete a dataset by ID
router.delete('/datasets/:id', deleteDataset);

//route to quering the db by suing specific filter select by user 
router.get("/dataset/specific", getFilteredData)

export default router;
