const parseQuestions = (rawText) => {
    const result = {
        quizQuestions: [],
        practiceQuestions: []
    };

    const cleanJsonString = (str, key) => {
        const regex = new RegExp(`${key}:\\s*\\{[^}]*\\}`, 'g');
        const match = str.match(regex);
        if (match && match.length > 0) {
            let jsonString = match[0].replace(`${key}:`, '').trim();

            // Remove comments and any non-JSON content
            jsonString = jsonString.replace(/\/\/.*(?=[,\}])/g, '').replace(/\s+or\s+.*(?=["'])/g, '').replace(/\//g, '');

            try {
                return JSON.parse(jsonString);
            } catch (error) {
                console.error(`Failed to parse ${key}:`, error.message, jsonString);
                return null;
            }
        }
        return null;
    };

    const quizQuestion = cleanJsonString(rawText, 'Quiz Question');
    const practiceQuestion = cleanJsonString(rawText, 'Practice Question');

    if (quizQuestion && quizQuestion.question && quizQuestion.options && quizQuestion.correctAnswer) {
        result.quizQuestions.push({
            question: quizQuestion.question,
            options: quizQuestion.options,
            correctAnswer: quizQuestion.correctAnswer
        });
    } else {
        console.error("Invalid or incomplete quiz question format.");
    }

    if (practiceQuestion && practiceQuestion.question) {
        result.practiceQuestions.push({
            question: practiceQuestion.question
        });
    } else {
        console.error("Invalid or incomplete practice question format.");
    }

    return result;
};

export default parseQuestions;
