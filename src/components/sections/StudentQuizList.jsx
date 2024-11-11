import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentQuizList = ({ onSelectQuiz }) => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_CALL_ADDRESS}/api/quizzes`);
            setQuizzes(response.data.data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    return (
        <div>
            <h2>Available Quizzes</h2>
            <div className="d-flex gap-3">
                {quizzes.map((quiz) => (
                    <div
                        key={quiz._id}
                        className="d-flex flex-column fw-bolder p-5 shadow rounded bg-warning"
                    >
                        <span className='fs-3'>{quiz.title}</span>
                        <button className='btn btn-primary' onClick={() => onSelectQuiz(quiz._id)}>take Quiz</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentQuizList;