import axios from 'axios';

const evaluatePracticeQuestion = async (practiceQuestion) => {
    const apikey = process.env.OPENAI_API_KEY;

    try {
        const response = await axios.post('https://api.pawan.krd/pai-001-light/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an AI that evaluates student answers to practice questions. Provide a detailed solution and a score between 0 and 5 based on the correctness and quality of the answer.'
                },
                {
                    role: 'user',
                    content: `Practice Question: ${practiceQuestion.question}\nUser Answer: ${practiceQuestion.userAnswer}\nEvaluate the answer and provide an example solution along with a score out of 5. And give the response in JSON format: 
                    {
                        "points": "3",
                        "exampleAnswer": "perfect solution and dont give explanation here, give the solution as how would you write the solution as student and not conversational text also"
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

        if (!response.data.choices || response.data.choices.length === 0 || !response.data.choices[0].message.content) {
            throw new Error('Evaluation result not found in API response');
        }

        const evaluationResult = response.data.choices[0].message.content.trim();
        console.log('Raw content:', evaluationResult);

        const cleanedResponse = cleanResponse(evaluationResult);
        console.log('Cleaned content:', cleanedResponse);

        const parsedResponse = JSON.parse(cleanedResponse);
        console.log('Parsed content:', parsedResponse);

        return {
            points: parsedResponse.points,
            exampleAnswer: parsedResponse.exampleAnswer.trim()
        };
    } catch (error) {
        console.error('Error evaluating practice question:', error.message);
        if (error.response) {
            console.error('Full response content:', error.response.data);
        }
        return {
            points: 0,
            exampleAnswer: 'Error occurred while evaluating the answer.'
        };
    }
};

const cleanResponse = (text) => {
    try {
        // Replace invalid JSON tokens with spaces
        const cleanedText = text.replace(/[^ -~]+/g, ' ');

        // Ensure the JSON string is properly formatted
        const jsonString = cleanedText.trim();

        return jsonString;
    } catch (error) {
        console.error('Error cleaning response:', error.message);
        return '{}'; // Return an empty JSON object if cleaning fails
    }
};


export default evaluatePracticeQuestion;
