import express from 'express';
import Assessment from '../models/Assessment.js';
import evaluatePracticeQuestion from '../utils/evaluatePracticeQuestion.js';
import User from '../models/User.js'

const router = express.Router();

// Route for evaluating assessments
router.post('/evaluate', async (req, res) => {
  try {
    // Extract assessment data from request body
    const { userId, topic, difficulty, timeTaken, questions } = req.body;

    // Process and evaluate quiz questions
    const evaluatedQuizQuestions = questions.quizQuestions.map(question => ({
      ...question,
      points: question.userAnswer === question.correctAnswer ? 1 : 0
    }));

    // Process and evaluate practice questions
    const evaluatedPracticeQuestions = await Promise.all(questions.practiceQuestions.map(async question => {
      const { points, exampleAnswer } = await evaluatePracticeQuestion(question);
      return {
        ...question,
        points,
        exampleAnswer
      };
    }));

    // Calculate total points for the assessment
    const totalPoints = evaluatedQuizQuestions.reduce((total, question) => total + question.points, 0) +
      evaluatedPracticeQuestions.reduce((total, question) => total + Number(question.points), 0);

    // Create a new Assessment document
    const assessment = new Assessment({
      userId,
      topic,
      difficulty,
      timeTaken,
      questions: {
        quizQuestions: evaluatedQuizQuestions,
        practiceQuestions: evaluatedPracticeQuestions
      },
      totalPoints
    });

    // Save the assessment to the database
    const savedAssessment = await assessment.save();

    // Update user's points
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.points += Number(totalPoints);
    await user.save();

    // Respond with the ID of the saved assessment
    res.status(201).json({ assessmentId: savedAssessment._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for getting assessment details by ID
router.get('/result/:id', async (req, res) => {
  try {
    // Extract assessment ID from request parameters
    const { id } = req.params;

    // Find the assessment in the database by ID
    const assessment = await Assessment.findById(id);

    // If assessment is not found, respond with 404 status and message
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    // If assessment is found, respond with the assessment details
    res.status(200).json(assessment);
  } catch (error) {
    // If an error occurs, respond with 500 status and error message
    res.status(500).json({ error: error.message });
  }
});

// Route for fetching all previous assessments of a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const assessments = await Assessment.find({ userId });
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for deleting all assessments of a user
router.delete('/deleteAll/:userId', async (req, res) => {
  try {
    // Extract user ID from request parameters
    const { userId } = req.params;

    // Delete all assessments for the given user ID
    const result = await Assessment.deleteMany({ userId });

    // Respond with the result of the deletion
    res.status(200).json({ message: `${result.deletedCount} assessments deleted for user ${userId}` });
  } catch (error) {
    // If an error occurs, respond with 500 status and error message
    res.status(500).json({ error: error.message });
  }
});

export default router;
