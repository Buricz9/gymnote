// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import CreatePlanPage from './components/CreatePlanPage';
import SelectPlanPage from './components/SelectPlanPage';
import RegisterPage from './components/RegisterPage';
import AddWorkoutPage from './components/AddWorkoutPage';
import AddExercisePage from './components/AddExercisePage';
import UserTrainingDetailsPage from './components/UserTrainingDetailsPage';
import { jwtDecode } from "jwt-decode";

const isAdmin = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken && decodedToken.sub) {
      return decodedToken.role == "ADMIN";
    }
    return false;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
}

const isManager = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken && decodedToken.sub) {
      return decodedToken.role == "MANAGER";
    }
    return false;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
}

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const payloadBase64Url = token.split(".")[1];
    const decodedPayload = JSON.parse(
      atob(payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/"))
    );

    // if (!decodedPayload.exp || Date.now() >= decodedPayload.exp * 1000) {
    //   logout();
    //   return false;
    // }
  } catch (error) {
    console.error("Error decoding auth_token:", error);
    return false;
  }

  return true;
};




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* <Route path='/create-plan' element={<CreatePlanPage />} /> */}
        <Route path="/create-plan" element={isAdmin() || isManager() ? <CreatePlanPage /> : <Navigate to="/details" />} />

        {/* <Route path='/select-plan' element={<SelectPlanPage />} /> */}
        <Route path="/select-plan" element={isAdmin() || isManager() ? <SelectPlanPage /> : <Navigate to="/details" />} />

        {/* <Route path='/registration' element={<RegisterPage />} /> */}
        <Route path="/registration" element={isManager() ? <RegisterPage /> : <Navigate to="/details" />} />

        {/* <Route path="/add-workout" element={<AddWorkoutPage />} /> */}
        <Route path="/add-workout" element={isAdmin() || isManager() ? <AddWorkoutPage /> : <Navigate to="/details" />} />

        {/* <Route path='/dodaj-cwiczenie' element={<AddExercisePage />} /> */}
        <Route path="/dodaj-cwiczenie" element={isAdmin() || isManager() ? <AddExercisePage /> : <Navigate to="/details" />} />

        <Route path="/details" element={isAuthenticated() ? <UserTrainingDetailsPage /> : <Navigate to="/login" />} />
        {/* <Route path="/admin" element={isAuthenticated() && isAdmin() ? <Admin /> : <Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
