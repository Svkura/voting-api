const Poll = require('../models/Polls');

exports.createPoll = async (req, res) => {
    try {
        const poll = new Poll({
            question: req.body.question, 
            options: req.body.options
        }) 
        await poll.save();
        res.status(201).json(poll);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.votePoll = async (req, res) => {
    try {
        const { optionIndex } = req.body;
        
        const poll = await Poll.findById(req.params.id);
        if (!poll) return res.status(404).json({ message: 'Poll not found' });
        if (typeof poll.options[optionIndex] === 'undefined') {
            return res.status(400).json({ message: 'Invalid option index' });
        }

        poll.options[optionIndex].votes += 1;
        await poll.save();

        res.status(200).json(poll);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getPolls = async (req, res) => {
    try {
        const polls = await Poll.find();
        res.status(200).json(polls);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

exports.updPoll = async (req, res) => {
    try {
        const updPolls = await Poll.findByIdAndUpdate(req.params.id, {
            question: req.body.question, 
            text: req.body.text
        }, {new: true});
        if (!updPolls) return res.status(404).json({message: 'Cannot found'});
        res.status(200).json(updPolls)
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

exports.deletePoll = async (req, res) => {
    try {
        const delPoll = await Poll.findByIdAndDelete(req.params.id);
        if (!delPoll) return res.status(404).json({ message: 'Contact not found' });
        res.json({ messag: 'Poll deleted'})
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}