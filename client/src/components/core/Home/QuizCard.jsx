import { useEffect, useState } from 'react';
import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';

const QuizCard = ({ quiz }) => {

    const [attempted, setAttempted] = useState(false)
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        // Convert both to strings for comparison to handle ObjectId vs string issues
        const quizIdStr = quiz._id.toString();
        const attemptedQuizIds = user?.attemptedQuizes?.map(id => id.toString()) || [];
        const isAttempted = attemptedQuizIds.includes(quizIdStr);
        
        console.log(`QuizCard (${quiz.title}): Quiz ${quizIdStr} is ${isAttempted ? 'attempted' : 'not attempted'}`);
        
        setAttempted(isAttempted);
    }, [user, quiz._id, quiz.title])

    // Render different UI based on user role
    const CardContent = () => (
        <>
            <h2 className='text-xl line-clamp-2 border-b border-slate-600 pb-3 mb-2'>{quiz.title}</h2>
            <span className='font-thin'>
                <p className='line-clamp-2'>{quiz.description}</p>
                <span className='flex gap-3'>
                    <p>{quiz.createdBy.username}</p>
                    |
                    <p>{formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true })}</p>
                </span>
            </span>

            <span className='absolute top-[10%] right-[-10%] rotate-[30deg]'>
                {
                    user?.role === "admin" ? (
                        <span className='bg-blue-600 text-white px-6 py-1 text-sm'>Your Quiz</span>
                    ) : attempted ? (
                        <span className='bg-green-600 text-white px-10 py-1 text-sm'>Completed</span>
                    ) : null
                }
            </span>
        </>
    );

    return (
        <>
            {user?.role === "admin" ? (
                // Admin users see a non-clickable card with admin styling
                <div className='border border-slate-600 bg-slate-900 p-3 rounded-lg relative overflow-hidden opacity-90 cursor-default'>
                    <CardContent />
                    <div className='absolute inset-0 bg-blue-900 bg-opacity-10 pointer-events-none'></div>
                    <div className='mt-2 text-sm text-blue-400'>Admin View - Cannot attempt own quiz</div>
                </div>
            ) : (
                // Regular users get the clickable link
                <Link to={`/quiz/${quiz._id}`} className='border border-slate-600 bg-slate-900 p-3 rounded-lg relative overflow-hidden hover:border-slate-400 transition-all duration-300'>
                    <CardContent />
                </Link>
            )}
        </>
    )
}

export default QuizCard