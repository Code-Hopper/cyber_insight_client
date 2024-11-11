import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizManagement = () => {
    const [quiz, setQuiz] = useState({
        title: '',
        description: '',
        category: '',
        difficulty: 'Medium',
        questions: [
            {
                questionText: '',
                options: [
                    { text: '', isCorrect: false },
                    { text: '', isCorrect: false },
                    { text: '', isCorrect: false },
                    { text: '', isCorrect: false }
                ],
                explanation: ''
            }
        ]
    });

    const [message, setMessage] = useState('');
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const handleInputChange = (e, field) => {
        setQuiz({ ...quiz, [field]: e.target.value });
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index][field] = value;
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const handleOptionChange = (qIndex, oIndex, field, value) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[qIndex].options[oIndex][field] = value;
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const addQuestion = () => {
        setQuiz({
            ...quiz,
            questions: [
                ...quiz.questions,
                {
                    questionText: '',
                    options: [
                        { text: '', isCorrect: false },
                        { text: '', isCorrect: false },
                        { text: '', isCorrect: false },
                        { text: '', isCorrect: false }
                    ],
                    explanation: ''
                }
            ]
        });
    };

    const fetchQuizzes = async () => {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const response = await axios.get(`${process.env.REACT_APP_API_CALL_ADDRESS}/admin/dashboard/getQuizzes`);
            setQuizzes(response.data.data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    const deleteQuiz = async (id) => {
        try {
            const adminToken = localStorage.getItem('adminToken');
            await axios.delete(`${process.env.REACT_APP_API_CALL_ADDRESS}/admin/dashboard/deleteQuiz/${id}`, {
                headers: {
                    'Authorization': adminToken,
                    'Content-Type': 'application/json'
                }
            });
            setMessage('Quiz deleted successfully');
            fetchQuizzes();
        } catch (error) {
            console.error('Error deleting quiz:', error);
            setMessage('Error deleting quiz');
        }
    };

    const saveQuiz = async () => {
        try {
            const adminToken = localStorage.getItem('adminToken');
            await axios.post(`${process.env.REACT_APP_API_CALL_ADDRESS}/admin/dashboard/saveQuiz`, quiz, {
                headers: {
                    'Authorization': adminToken,
                    'Content-Type': 'application/json'
                }
            });
            setMessage('Quiz saved successfully');
            fetchQuizzes();
        } catch (error) {
            console.error(error);
            setMessage('Error saving quiz');
        }
    };

    return (
        <div className='container-fluid'>
            <div className='container'>

                <div className='p-3'>
                    <h3>All Quizzes</h3>
                    <ul className='list-group'>
                        {quizzes.map((q) => (
                            <li className='list-group-item d-flex justify-content-between align-items-center' key={q._id}>
                                <span>{q.title}</span>
                                <button className='btn btn-danger' onClick={() => deleteQuiz(q._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <h2>Create Quiz</h2>
                {message && (() => {
                    alert(message);
                    setMessage('');  // Clear the message after alerting
                })()}


                <div className='p-3 shadow rounded mb-5'>
                    <label>Title:</label>
                    <input type="text" className='form-control' value={quiz.title} onChange={(e) => handleInputChange(e, 'title')} />

                    <label>Description:</label>
                    <textarea className='form-control' value={quiz.description} onChange={(e) => handleInputChange(e, 'description')} />

                    <div className='d-flex gap-4'>
                        <div className='flex-grow-1'>
                            <label>Category:</label>
                            <input type="text" className='form-control' value={quiz.category} onChange={(e) => handleInputChange(e, 'category')} />
                        </div>
                        <div className='flex-grow-1'>
                            <label>Difficulty:</label>
                            <select className='form-select' value={quiz.difficulty} onChange={(e) => handleInputChange(e, 'difficulty')}>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='p-3'>
                    <h3>Questions</h3>
                    {quiz.questions.map((question, qIndex) => (
                        <div className='border-bottom border-dark py-5' key={qIndex}>
                            <div className='d-flex gap-3'>
                                <div className='flex-grow-1'>
                                    <label>Question Text:</label>
                                    <input className='form-control' type="text" value={question.questionText} onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)} />
                                </div>
                                <div className='flex-grow-1'>
                                    <label>Explanation:</label>
                                    <input className='form-control' type="text" value={question.explanation} onChange={(e) => handleQuestionChange(qIndex, 'explanation', e.target.value)} />
                                </div>
                            </div>
                            <h4>Options</h4>
                            <div className='d-flex justify-content-between'>
                                {question.options.map((option, oIndex) => (
                                    <div className='d-flex flex-column' key={oIndex}>
                                        <input className='form-control' type="text" value={option.text} onChange={(e) => handleOptionChange(qIndex, oIndex, 'text', e.target.value)} />
                                        <label>
                                            <input type="checkbox" checked={option.isCorrect} onChange={(e) => handleOptionChange(qIndex, oIndex, 'isCorrect', e.target.checked)} /> Correct
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-3 d-flex gap-3">
                    <button className='btn btn-warning' onClick={addQuestion}>Add Question</button>
                    <button className='btn btn-primary' onClick={saveQuiz}>Save Quiz</button>
                </div>
            </div>
        </div>
    );
};

export default QuizManagement;