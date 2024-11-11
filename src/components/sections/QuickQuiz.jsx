import React, { useState } from 'react';
import StudentQuizList from '../sections/StudentQuizList';
import StudentQuizDetail from '../sections/StudentQuizDetail';

const QuickQuiz = () => {
    const [selectedQuizId, setSelectedQuizId] = useState(null);

    const handleSelectQuiz = (quizId) => {
        setSelectedQuizId(quizId);
    };

    return (
        <div className="container">
            <h1>Student Quiz Portal</h1>
            {!selectedQuizId ? (
                <StudentQuizList onSelectQuiz={handleSelectQuiz} />
            ) : (
                <StudentQuizDetail quizId={selectedQuizId} />
            )}
        </div>
    );
};

export default QuickQuiz;
