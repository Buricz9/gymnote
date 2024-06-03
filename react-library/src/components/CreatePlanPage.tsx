import React, { useState } from 'react';
import './styles/CreatePlanPage.css';
import Toolbar from './Toolbar';
import axios from 'axios';
import SearchUser from './SearchUser';
import './styles/global.css';

interface User {
    userId: number;
    email: string;
}

interface ExerciseDetail {
    exerciseName: string;
    name: string;
    sets: number;
    repetitions: number;
    tempo: string;
    restTime: string;
}

const CreatePlanPage: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newPlanName, setNewPlanName] = useState('');
    const [exercises, setExercises] = useState<ExerciseDetail[]>([]);

    const handleExerciseChange = (index: number, field: keyof ExerciseDetail, value: string | number) => {
        const newExercises: ExerciseDetail[] = [...exercises];
        newExercises[index] = {
            ...newExercises[index],
            [field]: value,
        };

        // Ustawienie wartości exerciseName
        if (field === 'name') {
            newExercises[index].exerciseName = value as string;
        }

        setExercises(newExercises);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedUser) return;
        try {
            const planResponse = await axios.post(`http://localhost:8080/api/workout-plans`, {
                userId: selectedUser.userId,
                planName: newPlanName
            });
            const planId = planResponse.data.planId;

            await Promise.all(
                exercises.map(async (exerciseDetail) => {
                    await axios.post(`http://localhost:8080/api/workout-plans/${planId}/details`, exerciseDetail);
                })
            );

            console.log('Plan created with details');
        } catch (error) {
            console.error('Error creating plan:', error);
        }
    };

    const handleAddExercise = () => {
        setExercises([
            ...exercises,
            {
                exerciseName: '',
                name: '',
                sets: 0,
                repetitions: 0,
                tempo: '',
                restTime: ''
            }
        ]);
    };

    const handleRemoveExercise = (index: number) => {
        setExercises(exercises.filter((_, i) => i !== index));
    };

    return (
        <div className="create-plan-page">
            <Toolbar />
            <h1>Create plan</h1>
            <SearchUser onUserSelected={setSelectedUser} />
            {selectedUser && (
                <div className="create-plan-section">
                    <h2>Create a New Plan</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={newPlanName} onChange={e => setNewPlanName(e.target.value)} placeholder="Plan Name" />
                        {exercises.map((exercise, index) => (
                            <div className="exercise" key={index}>
                                <input type="text" value={exercise.name || ''} onChange={e => handleExerciseChange(index, 'name', e.target.value)} placeholder="Exercise name" />
                                <input type="number" value={exercise.sets || ''} onChange={e => handleExerciseChange(index, 'sets', Number(e.target.value))} placeholder="Sets" />
                                <input type="number" value={exercise.repetitions || ''} onChange={e => handleExerciseChange(index, 'repetitions', Number(e.target.value))} placeholder="Repetitions" />
                                <input type="text" value={exercise.tempo || ''} onChange={e => handleExerciseChange(index, 'tempo', e.target.value)} placeholder="Tempo" />
                                <input type="text" value={exercise.restTime || ''} onChange={e => handleExerciseChange(index, 'restTime', e.target.value)} placeholder="Rest Time" />
                                <button type="button" onClick={() => handleRemoveExercise(index)}>Remove Exercise</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddExercise}>Add Exercise</button>
                        <button type="submit">Save Plan</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreatePlanPage;
