// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import CreatePlanPage from './components/CreatePlanPage';
import SelectPlanPage from './components/SelectPlanPage';
import RegisterPage from './components/RegisterPage';
import AddWorkoutPage from './components/AddWorkoutPage';
import AddExercisePage from './components/AddExercisePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/create-plan' element={<CreatePlanPage />} />
        <Route path='/select-plan' element={<SelectPlanPage />} />
        <Route path='/registration' element={<RegisterPage />} />
        <Route path="/add-workout" element={<AddWorkoutPage />} />
        <Route path='/dodaj-cwiczenie' element={<AddExercisePage />} />
      </Routes>
    </Router>
  );
}

export default App;
