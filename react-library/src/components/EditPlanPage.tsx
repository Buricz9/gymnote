import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles/EditPlanPage.css';
import Toolbar from './Toolbar';

interface Exercise {
    name: string;
    repetitions: number;
    sets: { repetitions: number; weight: number }[]; // Update the type of 'sets' property
    rir: number;
    tempo: string;
    notes: string;
}

interface TrainingPlan {
    name: string;
    plan: string;
    exercises: Exercise[];
    startDate: string;
    endDate: string;
}

const EditPlanPage: React.FC = () => {
    const location = useLocation();
    const selectedPlans: TrainingPlan[] = location.state.selectedPlans;

    const sortedPlans = selectedPlans.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    return (
        <div className="edit-plan-page">
            <Toolbar />
            <h2>Treningi użytkownika: {selectedPlans[0].name}</h2>
            <div className="plans-list">
                {sortedPlans.map((plan, index) => (
                    <div key={index} className="plan-item">
                        <h1>{plan.plan}</h1>
                        <p>Start: {new Date(plan.startDate).toLocaleString()}</p>
                        <p>Koniec: {new Date(plan.endDate).toLocaleString()}</p>
                        {Array.isArray(plan.exercises) && plan.exercises.length > 0 ? (
                            plan.exercises.map((exercise, idx) => (
                                <div key={idx}>
                                    <h4>Ćwiczenie: {exercise.name}</h4>
                                    <p>Założenia:  Powtórzenia: {exercise.repetitions}  RIR: {exercise.rir}  Tempo: {exercise.tempo}  Uwagi: {exercise.notes}</p>
                                    <h5>Szczegóły serii:</h5>
                                    {Array.isArray(exercise.sets) ? (
                                        <ul>
                                            {exercise.sets.map((set, setIdx) => (
                                                <li key={setIdx}>
                                                    <p>Seria: {setIdx + 1} Powtórzenia: {set.repetitions} Ciężar: {set.weight}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No sets available</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>Brak ćwiczeń</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default EditPlanPage;
