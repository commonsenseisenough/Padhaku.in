import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import cartReducer from '../slices/cartSlice';
import courseReducer from '../slices/courseSlice'; // ✅ import this
import viewCourseReducer from '../slices/viewCourseSlice'  // ✅


const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseReducer, // ✅ register it here
     viewCourse: viewCourseReducer, 
  },
});

export default store;
