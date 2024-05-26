import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: String,
    userAnswer: String,
    points: Number
});

const practiceQuestionSchema = new mongoose.Schema({
    question: String,
    userAnswer: String,
    points: Number,
    exampleAnswer: String
});

const assessmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topic: String,
    difficulty: String,
    timeTaken: String,
    questions: {
        quizQuestions: [quizQuestionSchema],
        practiceQuestions: [practiceQuestionSchema]
    },
    totalPoints: Number
}, { timestamps: true });

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment;
