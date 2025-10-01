import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { apiConnector } from "../services/apiConnector"
import { quizEndpoints } from "../services/APIs/index"
import QuizCard from '../components/core/Home/QuizCard'
import Navbar from '../components/Navbar'

const Home = () => {

  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, user } = useSelector(state => state.auth)

  const fetchQuizzes = async () => {
    setLoading(true)
    try {
      // Use different endpoints based on user role
      const endpoint = user?.role === "admin" 
        ? quizEndpoints.GET_ADMIN_QUIZZES 
        : quizEndpoints.GET_ALL_QUIZZES;

      const response = await apiConnector("GET", endpoint, null, {
        Authorization: `Bearer ${token}`
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      setQuizzes(response.data.data);

    } catch (e) {
      console.log("COULDNT GET QUIZZES", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuizzes();
  }, [])

  return (
    <div>
      <Navbar />
      <section className='min-h-[90vh] border-t border-slate-600 py-5 mt-3'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold mb-2'>
            {user?.role === "admin" ? "Your Created Quizzes" : "Available Quizzes"}
          </h1>
          <p className='text-gray-400 text-sm'>
            {user?.role === "admin" 
              ? "Manage and view quizzes you've created" 
              : "Choose a quiz to test your knowledge"
            }
          </p>
        </div>
        {
          loading ? <div className='text-center min-h-[90vh] flex items-center justify-center text-xl'>Loading...</div>
            : !loading && quizzes?.length > 0
              ? <div className='grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3'>
                {
                  quizzes.map((quiz, index) => (
                    <QuizCard key={quiz._id} quiz={quiz} index={index} />
                  ))
                }
              </div>
              : <div className='text-center min-h-[50vh] flex flex-col items-center justify-center gap-4'>
                  {user?.role === "admin" ? (
                    <>
                      <p className='text-lg text-gray-400'>You haven't created any quizzes yet.</p>
                      <p className='text-sm text-gray-500'>Create your first quiz from the dashboard to see it here.</p>
                    </>
                  ) : (
                    <p className='text-lg text-gray-400'>No quizzes available at the moment. Check back later!</p>
                  )}
                </div>
        }
      </section>
    </div>
  )
}

export default Home