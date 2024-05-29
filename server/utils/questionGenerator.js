import axios from 'axios';

const generateSingleQuestion = async (topic, difficulty) => {
    const apikey = process.env.OPENAI_API_KEY; 
    try {
        const response = await axios.post('https://api.pawan.krd/pai-001-light/v1/chat/completions', {
            model: 'gpt-3.5-unfiltered',
            messages: [
                {
                    role: 'system',
                    content: 'You are an AI that generates well-structured multiple-choice quiz questions and real-world practice questions for students. The practice question should involve using that concept in a real-life application. Respond only with valid JSON, and do not include any comments or extra text.'
                },
                {
                    role: 'user',
                    content: `Generate 1 quiz question and 1 practice question on the topic of ${topic} and ${difficulty} in the following JSON format:
                    {
                        "quizQuestion": {
                            "question": "Question text",
                            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                            "correctAnswer": "Option 3"
                        },
                        "practiceQuestion": {
                            "question": "Question text"
                        }
                    }`
                }
            ],
            max_tokens: 1000,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${apikey}`,
                'Content-Type': 'application/json',
            },
        });

        // console.log('Full response from API:', response.data);

        let generatedText = response.data.choices[0]?.message.content.trim() || '';

        // Clean the response to remove any unexpected characters
        generatedText = cleanResponse(generatedText);

        console.log("cleaned:",generatedText);

        // Attempt to parse the response to ensure it is valid JSON
        try {
            const parsedResponse = JSON.parse(generatedText);
            return parsedResponse;
        } catch (error) {
            console.error('Failed to parse response:', error.message, generatedText);
            throw new Error('Invalid JSON format in the response');
        }

    } catch (error) {
        console.error('Error generating question:', error.response ? error.response.data : error.message);
        throw new Error('Failed to generate question');
    }
};

const generatePracticeQuestions = async (topic, difficulty, numQuestions = 4) => {
    const quizQuestions = [];
    const practiceQuestions = [];
    
    for (let i = 0; i < numQuestions; i++) {
        try {
            const question = await generateSingleQuestion(topic, difficulty);
            if (question.quizQuestion) quizQuestions.push(question.quizQuestion);
            if (question.practiceQuestion) practiceQuestions.push(question.practiceQuestion);
        } catch (error) {
            console.error(`Error generating question ${i + 1}:`, error.message);
            // Skip to the next question if there's an error
        }
    }

    return { quizQuestions, practiceQuestions };
};

const cleanResponse = (text) => {
    // Remove asterisks and double underscores from the text
    return text.replace(/[*_]+/g, '');
};

export default generatePracticeQuestions;
