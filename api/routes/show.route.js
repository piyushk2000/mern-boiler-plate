// userShowRoutes.js
import express from 'express';
import {
  getAllUserShows,
  getAllUserShowsId,
  addUserShow,
  getUserShowById,
} from '../controllers/show.controller.js';

const router = express.Router();

// Routes

// Get all shows added by a specific user
router.get('/user/:userId/shows', getAllUserShows);

// Get all showIds added by a specific user
router.get('/user/:userId/showIds', getAllUserShowsId);

// Add a user's relationship with a show
router.post('/user/shows', addUserShow);

// Get a user's relationship with a specific show by ID
router.get('/user/:userId/show/:showId', getUserShowById);

export default router;
