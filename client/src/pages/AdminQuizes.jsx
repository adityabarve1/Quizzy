import React, { useEffect, useState } from 'react'
import { apiConnector } from "../services/apiConnector"
import { quizEndpoints } from '../services/APIs';
import { useSelector } from "react-redux"
import QuizCard from '../components/core/AdminQuizes/QuizCard';
import { deleteQuiz } from '../services/operations/QuizAPIs';

const AdminQuizes = () => {

    const [quizes, setQuizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useSelector(state => state.auth);

    const handleDeleteQuiz = async (id) => {
        try {
            setLoading(true);

            const response = await deleteQuiz(id, token)
            if (response) {
                setQuizes(quizes.filter(quiz => quiz._id !== id));
            }

        } catch (e) {
            console.log("ERROR DELETING QUIZ : ", e);
        } finally {
            setLoading(false);
        }
    }

    const fetchAdminQuizes = async () => {
        try {
            setError(null); // Clear any previous errors
            const response = await apiConnector("GET", quizEndpoints.GET_ADMIN_QUIZZES, null, {
                Authorization: `Bearer ${token}`
            })

            if (response?.data?.success) {
                setQuizes(response?.data?.data || []);
            } else {
                setError("Failed to fetch quizzes");
                setQuizes([]);
            }
        } catch (error) {
            console.error('Error fetching admin quizes:', error);
            setError(error.message || "Failed to fetch quizzes. Please check your connection and try again.");
            setQuizes([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAdminQuizes();
    }, [])

    return (
        <section>
            <div className='flex flex-col gap-3'>
                {
                    loading ? (
                        <div className='flex justify-center items-center min-h-[90vh]'>
                            <div className='text-lg'>Loading your quizzes...</div>
                        </div>
                    ) : error ? (
                        <div className='flex flex-col justify-center items-center min-h-[90vh] gap-4'>
                            <div className='text-red-500 text-lg'>Error: {error}</div>
                            <button 
                                onClick={fetchAdminQuizes}
                                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                            >
                                Try Again
                            </button>
                        </div>
                    ) : quizes.length > 0 ? (
                        quizes.map((quiz, index) => (
                            <QuizCard handleDeleteQuiz={handleDeleteQuiz} key={quiz._id} quiz={quiz} index={index} />
                        ))
                    ) : (
                        <div className='flex justify-center items-center min-h-[90vh]'>
                            <div className='text-lg text-gray-400'>No quizzes found. Create your first quiz!</div>
                        </div>
                    )
                }
                    
            </div>
        </section>
    )
}

export default AdminQuizes