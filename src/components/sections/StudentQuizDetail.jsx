import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentQuizDetail = ({ quizId }) => {
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuiz();
    }, [quizId]);

    // Log result after it's updated
    useEffect(() => {
        if (result) {
            console.log('Result:', result); // Log the result state once it's updated
        }
    }, [result]);

    const fetchQuiz = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_CALL_ADDRESS}/api/quizzes/${quizId}`);
            setQuiz(response.data.data);
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    };

    const handleOptionChange = (questionId, optionText) => {
        setAnswers({ ...answers, [questionId]: optionText });
    };

    const submitQuiz = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_CALL_ADDRESS}/api/quizzes/${quizId}/validate`, { answers });
            setResult(response.data.result); // Make sure to set the result correctly from the response
        } catch (error) {
            console.error('Error validating quiz:', error);
        }
    };

    const goBack = () => {
        navigate(-1);  // Navigate back to the quizzes list
    };

    if (!quiz) return <p>Loading quiz...</p>;

    return (
        <div>
            <h3 className='fw-bolder'>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <div className='d-flex flex-column gap-3'>
                {quiz.questions.map((question, qIndex) => (
                    <div className='border p-3 rounded' key={qIndex}>
                        <h5 className='fw-semibold'>{question.questionText}</h5>
                        <div className='d-flex gap-5'>
                            {question.options.map((option, oIndex) => (
                                <label className='d-flex gap-2' key={oIndex}>
                                    <input
                                        className='form-check-input'
                                        type="radio"
                                        name={`question-${qIndex}`}
                                        checked={answers[question._id] === option.text} // Compare with option.text
                                        onChange={() => handleOptionChange(question._id, option.text)} // Pass option.text
                                    />
                                    {option.text}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className='my-4'>
                <button className="btn btn-primary" onClick={submitQuiz}>Submit</button>
            </div>

            {result && (
                <div className="alert alert-info">
                    <h4>Result</h4>
                    <p>Score: {result.score}</p>
                    <p>Feedback: {result.feedback}</p>
                </div>
            )}

            <button className="btn btn-secondary" onClick={goBack}>Go Back</button>
        </div>
    );
};

export default StudentQuizDetail;