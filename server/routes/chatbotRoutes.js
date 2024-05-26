import express from 'express';
import generatePracticeQuestions from '../utils/questionGenerator.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
    const { topic, difficulty } = req.body;

    try {
        const questions = await generatePracticeQuestions(topic, difficulty, 4);
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error in /generate route:', error.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

export default router;
