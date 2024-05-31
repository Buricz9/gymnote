// import React, { useState } from 'react';
// import './styles/CreatePlanPage.css';
// import Toolbar from './Toolbar';
// import axios from 'axios';

// interface User {
//     userId: number;
//     email: string;
// }

// interface Exercise {
//     name: string;
//     repetitions: number;
//     sets: number;
//     rir: number;
//     tempo: string;
//     notes: string;
// }

// const CreatePlanPage: React.FC = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedUser, setSelectedUser] = useState<User | null>(null);
//     const [trainingPlan, setTrainingPlan] = useState('');
//     const [newPlanName, setNewPlanName] = useState('');
//     const [exercises, setExercises] = useState<Exercise[]>([]);

//     const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const term = e.target.value.toLowerCase();
//         console.log('Searching for user:', term); // Dodaj ten log
//         setSearchTerm(term);
//         try {
//             const response = await axios.get<User>(`http://localhost:8080/users/email/${term}`);
//             console.log('-----Response:', response.data); // Dodaj ten log
//             setSelectedUser(response.data || null);
//         } catch (error) {
//             console.error('Error searching for user:', error);
//         }
//     };


//     const handleExerciseChange = (index: number, field: keyof Exercise, value: string | number) => {
//         const newExercises: Exercise[] = [...exercises];
//         newExercises[index] = {
//             ...newExercises[index],
//             [field]: value as string | number,
//         };
//         setExercises(newExercises);
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!selectedUser) return;
//         try {
//             const response = await axios.post(`/api/workout-plans`, {
//                 user: selectedUser,
//                 planName: newPlanName,
//                 exercises
//             });
//             console.log('Plan created:', response.data);
//         } catch (error) {
//             console.error('Error creating plan:', error);
//         }
//     };

//     const handleAddExercise = () => {
//         setExercises([...exercises, { name: '', repetitions: 0, sets: 0, rir: 0, tempo: '', notes: '' }]);
//     };

//     const handleRemoveExercise = (index: number) => {
//         setExercises(exercises.filter((_, i) => i !== index));
//     };

//     return (
//         <div className="create-plan-page">
//             <Toolbar />
//             <div className="search-section">
//                 <h2>Search for a User</h2>
//                 <input type="email" value={searchTerm} onChange={handleSearch} />
//                 {searchTerm && !selectedUser && <p>User not found.</p>}
//                 {!searchTerm && <p>Enter the email address you want to search for.</p>}
//                 {selectedUser && <p>Selected user: {selectedUser.email}</p>}
//             </div>
//             {selectedUser && (
//                 <div className="create-plan-section">
//                     <h2>Create a New Plan</h2>
//                     <form onSubmit={handleSubmit}>
//                         <input type="text" value={newPlanName} onChange={e => setNewPlanName(e.target.value)} placeholder="Plan Name" />
//                         {exercises.map((exercise, index) => (
//                             <div className="exercise" key={index}>
//                                 <input type="text" value={exercise.name} onChange={e => handleExerciseChange(index, 'name', e.target.value)} placeholder="Exercise Name" />
//                                 <div className="exercise-details">
//                                     <div className="repetitions-sets-weight">
//                                         <input type="number" value={exercise.repetitions || ''} onChange={e => handleExerciseChange(index, 'repetitions', Number(e.target.value))} placeholder="Reps" />
//                                         <input type="number" value={exercise.sets || ''} onChange={e => handleExerciseChange(index, 'sets', Number(e.target.value))} placeholder="Sets" />
//                                         <input type="number" value={exercise.rir || ''} onChange={e => handleExerciseChange(index, 'rir', Number(e.target.value))} placeholder="RIR" />
//                                         <input type="text" value={exercise.tempo || ''} onChange={e => handleExerciseChange(index, 'tempo', e.target.value)} placeholder="Tempo" />
//                                     </div>
//                                     <textarea className="full-width" value={exercise.notes || ''} onChange={e => handleExerciseChange(index, 'notes', e.target.value)} placeholder="Notes" />
//                                 </div>
//                                 <button type="button" onClick={() => handleRemoveExercise(index)}>Remove Exercise</button>
//                             </div>
//                         ))}
//                         <button type="button" onClick={handleAddExercise}>Add Exercise</button>
//                         <button type="submit">Save Plan</button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CreatePlanPage;
import React, { useState } from 'react';
import './styles/CreatePlanPage.css';
import Toolbar from './Toolbar';
import axios from 'axios';

interface User {
    userId: number;
    email: string;
}

const CreatePlanPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newPlanName, setNewPlanName] = useState('');

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        console.log('Searching for user:', term);
        setSearchTerm(term);
        try {
            const response = await axios.get<User>(`http://localhost:8080/users/email/${term}`);
            console.log('Response:', response.data);
            setSelectedUser(response.data || null);
        } catch (error) {
            console.error('Error searching for user:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedUser) return;
        try {
            const response = await axios.post(`http://localhost:8080/api/workout-plans`, {
                userId: selectedUser.userId,
                planName: newPlanName
            });
            console.log('Plan created:', response.data);
        } catch (error) {
            console.error('Error creating plan:', error);
        }
    };

    return (
        <div className="create-plan-page">
            <Toolbar />
            <div className="search-section">
                <h2>Search for a User</h2>
                <input type="email" value={searchTerm} onChange={handleSearch} />
                {searchTerm && !selectedUser && <p>User not found.</p>}
                {!searchTerm && <p>Enter the email address you want to search for.</p>}
                {selectedUser && <p>Selected user: {selectedUser.email}</p>}
            </div>
            {selectedUser && (
                <div className="create-plan-section">
                    <h2>Create a New Plan</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={newPlanName} onChange={e => setNewPlanName(e.target.value)} placeholder="Plan Name" />

                        <button type="submit">Save Plan</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreatePlanPage;
