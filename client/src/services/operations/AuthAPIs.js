import { authEndpoints } from "../APIs";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { setToken, setUser } from "../../slices/AuthSlice";

const { SIGNUP, LOGIN } = authEndpoints;

export const signUp = async (data) => {
  try {
    const response = await apiConnector("POST", SIGNUP, data);

    if (!response?.data?.success) {
      throw new Error(response?.data?.error || "Signup failed");
    }

    console.log("SIGNUP RESPONSE: ", response);

    toast.success("Signed Up Successfully");
    return true;
  } catch (e) {
    console.log("ERROR WHILE SIGNING UP: ", e);
    toast.error(e?.response?.data?.error || "Something went wrong during signup");
  }
  return false;
};

export const login = async (data, dispatch) => {
  try {
    const response = await apiConnector("POST", LOGIN, data);

    if (!response?.data?.success) {
      throw new Error(response?.data?.error || "Login failed");
    }

    console.log("LOGIN RESPONSE: ", response);

    const token = response?.data?.data?.token;
    const user = response?.data?.data?.user;

    console.log("User data from server:", user);
    console.log("User attemptedQuizes:", user?.attemptedQuizes);

    // Save token and user in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Dispatch actions to update the Redux state
    dispatch(setToken(token));
    dispatch(setUser(user));

    toast.success("Logged In Successfully");
    return true;
  } catch (e) {
    console.log("ERROR WHILE LOGGING IN: ", e);
    toast.error(e?.response?.data?.error || "Something went wrong during login");
  }
  return false;
};

export const logout = async (dispatch, navigate) => {
  try {
    // Remove token and user from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Dispatch actions to reset the auth state
    dispatch(setToken(null));
    dispatch(setUser(null));

    toast.success("Logged Out Successfully");

    // Navigate the user to the login page
    navigate("/login");
    return true;
  } catch (e) {
    console.log("ERROR WHILE LOGGING OUT: ", e);
    toast.error("Logout failed");
  }
  return false;
};
