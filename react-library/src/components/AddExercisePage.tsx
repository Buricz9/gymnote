import React, { useState } from 'react';
import './styles/AddExercisePage.css';
import Toolbar from './Toolbar';
import axios from 'axios';

const AddExercisePage: React.FC = () => {
    const [exerciseName, setExerciseName] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/exercises`, {
                exerciseName,
            });
            console.log('Exercise created:', response.data);
            // Reset form fields
            setExerciseName('');
        } catch (error) {
            console.error('Error creating exercise:', error);
        }
    };

    return (
        <div className="add-exercise-page">
            <Toolbar />
            <div className="form-section">
                <h2>Add a New Exercise</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={exerciseName}
                        onChange={e => setExerciseName(e.target.value)}
                        placeholder="Exercise Name"
                        required
                    />
                    <button type="submit">Add Exercise</button>
                </form>
            </div>
        </div>
    );
};

export default AddExercisePage;
