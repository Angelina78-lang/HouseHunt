import express from 'express';
import {
    getProperties,
    getPropertyById,
    createProperty,
    updatePropertyStatus,
    getMyProperties,
    toggleFavorite,
    getFavoriteProperties,
    getPropertyStats
} from '../controllers/propertyController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProperties).post(protect, createProperty);
router.route('/stats').get(getPropertyStats);
router.route('/myproperties').get(protect, getMyProperties);
router.route('/favorites').get(protect, getFavoriteProperties);
router.route('/:id').get(getPropertyById);
router.route('/:id/status').put(protect, admin, updatePropertyStatus);
router.route('/:id/favorite').post(protect, toggleFavorite);

export default router;
