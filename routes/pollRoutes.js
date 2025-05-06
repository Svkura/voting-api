const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

router.post('/', pollController.createPoll);
router.get('/', pollController.getPolls);
router.post('/:id/vote', pollController.votePoll);
router.put('/:id', pollController.updPoll)
router.delete('/:id', pollController.deletePoll);

module.exports = router;