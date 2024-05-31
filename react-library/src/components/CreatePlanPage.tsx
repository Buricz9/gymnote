import React, { useState } from 'react';
import './styles/CreatePlanPage.css';
import Toolbar from './Toolbar';
import axios from 'axios';

interface User {
    userId: number;
    name: string;
}

interface Exercise {
    name: string;
    repetitions: number;
    sets: number;
    rir: number;
    tempo: string;
    notes: string;
}

const CreatePlanPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [trainingPlan, setTrainingPlan] = useState('');
    const [newPlanName, setNewPlanName] = useState('');
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        try {
            const response = await axios.get<User[]>(`/api/users?name=${term}`);
            const foundUser = response.data[0]; // Assuming there's only one user with the given name
            setSelectedUser(foundUser || null);
        } catch (error) {
            console.error('Error searching for user:', error);
        }
    };

    const handleExerciseChange = (index: number, field: keyof Exercise, value: string | number) => {
        const newExercises: Exercise[] = [...exercises];
        newExercises[index] = {
            ...newExercises[index],
            [field]: value as string | number,
        };
        setExercises(newExercises);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedUser) return;
        try {
            const response = await axios.post(`/api/users/${selectedUser.userId}/training-plan`, {
                planName: newPlanName,
                exercises
            });
            console.log('Plan created:', response.data);
        } catch (error) {
            console.error('Error creating plan:', error);
        }
    };

    const handleAddExercise = () => {
        setExercises([...exercises, { name: '', repetitions: 0, sets: 0, rir: 0, tempo: '', notes: '' }]);
    };

    const handleRemoveExercise = (index: number) => {
        setExercises(exercises.filter((_, i) => i !== index));
    };

    return (
        <div className="create-plan-page">
            <Toolbar />
            <div className="search-section">
                <h2>Wyszukaj użytkownika</h2>
                <input type="text" value={searchTerm} onChange={handleSearch} />
                {searchTerm && !selectedUser && <p>Nie znaleziono użytkownika.</p>}
                {!searchTerm && <p>Wpisz nazwę użytkownika, którego chcesz wyszukać.</p>}
                {selectedUser && <p>Wybrany użytkownik: {selectedUser.name}</p>}
            </div>
            {selectedUser && (
                <div className="create-plan-section">
                    <h2>Utwórz nowy plan</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={newPlanName} onChange={e => setNewPlanName(e.target.value)} placeholder="Nazwa planu" />
                        {exercises.map((exercise, index) => (
                            <div className="exercise" key={index}>
                                <input type="text" value={exercise.name} onChange={e => handleExerciseChange(index, 'name', e.target.value)} placeholder="Nazwa ćwiczenia" />
                                <div className="exercise-details">
                                    <div className="repetitions-sets-weight">
                                        <input type="number" value={exercise.repetitions || ''} onChange={e => handleExerciseChange(index, 'repetitions', Number(e.target.value))} placeholder="Powt." />
                                        <input type="number" value={exercise.sets || ''} onChange={e => handleExerciseChange(index, 'sets', Number(e.target.value))} placeholder="Serie" />
                                        <input type="number" value={exercise.rir || ''} onChange={e => handleExerciseChange(index, 'rir', Number(e.target.value))} placeholder="RIR" />
                                        <input type="text" value={exercise.tempo || ''} onChange={e => handleExerciseChange(index, 'tempo', e.target.value)} placeholder="Tempo" />
                                    </div>
                                    <textarea className="full-width" value={exercise.notes || ''} onChange={e => handleExerciseChange(index, 'notes', e.target.value)} placeholder="Uwagi" />
                                </div>
                                <button type="button" onClick={() => handleRemoveExercise(index)}>Usuń ćwiczenie</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddExercise}>Dodaj ćwiczenie</button>
                        <button type="submit">Zapisz plan</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreatePlanPage;
