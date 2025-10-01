import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../Button';
import QuestionCard from './QuestionCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../../services/apiConnector';
import { quizEndpoints } from "../../../services/APIs";
import { setUser } from "../../../slices/AuthSlice";

const QuizQuestions = ({ quizDetails, quizQuestions }) => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const { token, user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (quizDetails?.timer) {
            setRemainingTime(quizDetails.timer * 60);
        }
    }, [quizDetails]);

    useEffect(() => {
        let timer;
        if (quizStarted && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (quizStarted && remainingTime === 0) {
            clearInterval(timer);
            alert('Time is up!');
            submitQuiz();
        }
        return () => clearInterval(timer);
    }, [quizStarted, remainingTime]);

    const handleAnswerChange = useCallback((questionId, selectedOption) => {
        setUserAnswers(prevAnswers => {
            const existingAnswerIndex = prevAnswers.findIndex(
                (answer) => answer.questionId === questionId
            );
            if (existingAnswerIndex >= 0) {
                prevAnswers[existingAnswerIndex].selectedOption = selectedOption;
            } else {
                prevAnswers.push({ questionId, selectedOption });
            }
            return [...prevAnswers];
        });
    }, []);

    const startQuiz = () => {
        console.log('Starting quiz...');
        setQuizStarted(true);
    };

    const submitQuiz = async () => {
        try {
            console.log('Submit button clicked!');
            console.log('User answers:', userAnswers);
            console.log('Quiz details:', quizDetails);
            console.log('Token:', token ? 'Present' : 'Missing');
            
            if (userAnswers.length === 0) {
                alert('Please answer at least one question before submitting.');
                return;
            }
            
            const response = await apiConnector(
                'POST',
                quizEndpoints.ATTEMPT_QUIZ(quizDetails._id),
                {
                    quizId: quizDetails._id,
                    answers: userAnswers,
                },
                {
                    Authorization: `Bearer ${token}`,
                }
            );
            
            console.log('Submit response:', response);
            
            if (response.data.success) {
                // Update user with attempted quiz
                console.log('Before update - user attemptedQuizes:', user.attemptedQuizes);
                console.log('Adding quiz ID:', quizDetails._id);
                
                const updatedUser = { ...user, attemptedQuizes: [...(user.attemptedQuizes || []), quizDetails._id] };
                
                console.log('After update - user attemptedQuizes:', updatedUser.attemptedQuizes);
                
                // Update Redux store
                dispatch(setUser(updatedUser));
                
                // Update localStorage to persist the change
                localStorage.setItem("user", JSON.stringify(updatedUser));
                
                console.log('Updated user saved to localStorage:', updatedUser);
                
                console.log('Updated user with attempted quiz:', updatedUser);
                
                navigate('/quiz-results', { state: { score: response.data.score, total: quizQuestions?.length } });
            } else {
                throw new Error(response.data.error || 'Failed to submit quiz');
            }
        } catch (error) {
            console.error('Error submitting quiz:', error);
            console.error('Error details:', error.response?.data);
            alert(`Failed to submit quiz: ${error.response?.data?.error || error.message}`);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Don't render if quiz details or questions are not available
    if (!quizDetails || !quizQuestions || quizQuestions.length === 0) {
        return (
            <div className='flex py-5 border min-h-[70vh] px-5 justify-center items-center mt-5 rounded-lg bg-slate-900 border-slate-600'>
                <div className='text-center'>
                    {!quizDetails ? "Quiz details not available" : "No questions available for this quiz"}
                </div>
            </div>
        );
    }

    return (
        <div className='flex py-5 border min-h-[70vh] px-5 justify-center items-start mt-5 rounded-lg bg-slate-900 border-slate-600'>
            {!quizStarted ? (
                <Button className='w-max self-center' onClick={startQuiz}>Start Quiz</Button>
            ) : (
                <div className='w-full flex flex-col'>
                    <h2 className='border border-slate-600 py-2 px-3 rounded-lg text-center md:text-end'>Time Remaining: <span className='text-red-500 ml-2'>{formatTime(remainingTime)}</span></h2>
                    <div className='min-h-[50vh]'>
                        {quizQuestions && quizQuestions.map((ques) => (
                            <QuestionCard
                                key={ques._id}
                                question={ques}
                                onAnswerChange={handleAnswerChange}
                            />
                        ))}
                    </div>
                    <Button 
                        className='w-max self-end' 
                        onClick={() => {
                            console.log('Submit button clicked from JSX');
                            submitQuiz();
                        }}
                    >
                        Submit
                    </Button>
                </div>
            )}
        </div>
    );
};

export default QuizQuestions;
