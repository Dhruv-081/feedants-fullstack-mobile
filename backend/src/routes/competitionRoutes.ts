import { Router } from 'express';
import {
  getCompetition,
  getMyStatus,
  registerCompetition,
  submitEntry,
  getDiscussions,
  postQuestion,
  getWinners,
  getReviews,
} from '../controllers/competitionController';

const router = Router();

router.get('/:id', getCompetition);
router.get('/:id/my-status', getMyStatus);
router.post('/:id/register', registerCompetition);
router.post('/:id/submission', submitEntry);
router.get('/:id/discussions', getDiscussions);
router.post('/:id/discussions', postQuestion);
router.get('/:id/winners', getWinners);
router.get('/:id/reviews', getReviews);

export default router;
