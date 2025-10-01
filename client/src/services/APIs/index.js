const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authEndpoints = {
  SIGNUP: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
};

export const quizEndpoints = {
  CREATE_QUIZ: `${BASE_URL}/quizzes`,                      // POST request for creating a quiz
  UPDATE_QUIZ: (quizId) => `${BASE_URL}/quizzes/${quizId}`, // PUT request to update a specific quiz
  DELETE_QUIZ: (quizId) => `${BASE_URL}/quizzes/${quizId}`, // DELETE request to delete a specific quiz
  GET_ADMIN_QUIZZES: `${BASE_URL}/admin-quizzes`,          // GET request for quizzes by admin
  GET_SCORES: `${BASE_URL}/attempts`,                      // GET request to fetch scores
  GET_ALL_QUIZZES: `${BASE_URL}/quizzes`,                  // GET request for all quizzes
  GET_QUIZ_DETAILS: (quizId) => `${BASE_URL}/quizzes/${quizId}`, // GET request for quiz details by quiz ID
  ATTEMPT_QUIZ: (quizId) => `${BASE_URL}/quizzes/${quizId}/attempt`, // POST for quiz attempts
  GET_USER_ATTEMPTS: `${BASE_URL}/attempts`,               // GET request for user attempts
};

export const questionEndpoints = {
  CREATE_QUESTION: `${BASE_URL}/questions`,                // POST request to create a question
  UPDATE_QUESTION: (questionId) => `${BASE_URL}/questions/${questionId}`, // PUT request to update a specific question
  DELETE_QUESTION: (questionId) => `${BASE_URL}/questions/${questionId}`, // DELETE request for specific question
  GET_QUIZ_QUESTIONS: (quizId) => `${BASE_URL}/questions/${quizId}`, // GET request for all questions of a quiz
};
