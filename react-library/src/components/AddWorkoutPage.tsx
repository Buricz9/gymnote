import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './styles/AddWorkoutPage.css';
import Toolbar from './Toolbar';

interface PlanDetail {
    detailId: number;
    workoutPlan: {
        planId: number;
        planName: string;
    };
    exerciseName: string;
    sets: number;
    repetitions: number;
    tempo: string;
    restTime: string;
}

interface SessionExercise {
    detailId: number;
    series: number;
    weight: number;
    repetitionsCompleted: number;
    tempoUsed: string;
    restTimeUsed: string;
    exerciseNotes: string;
}

const AddWorkoutPage: React.FC = () => {
    const location = useLocation();
    const { planId, planName, userId } = location.state;
    const [planDetails, setPlanDetails] = useState<PlanDetail[]>([]);
    const [sessionDate, setSessionDate] = useState<string>('');
    const [sessionExercises, setSessionExercises] = useState<{ [key: number]: SessionExercise[] }>({});

    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                const response = await axios.get<PlanDetail[]>(`http://localhost:8080/api/workout-plans/${planId}/exercises`);
                setPlanDetails(response.data);
            } catch (error) {
                console.error('Error fetching plan details:', error);
            }
        };

        fetchPlanDetails();
    }, [planId]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSessionDate(e.target.value);
    };

    const handleAddSeries = (detailId: number) => {
        setSessionExercises(prevState => {
            const newSeriesNumber = (prevState[detailId]?.length || 0) + 1;
            const newSeries: SessionExercise = {
                detailId,
                series: newSeriesNumber,
                weight: 0,
                repetitionsCompleted: 0,
                tempoUsed: '',
                restTimeUsed: '',
                exerciseNotes: ''
            };
            return {
                ...prevState,
                [detailId]: [...(prevState[detailId] || []), newSeries]
            };
        });
    };

    const handleRemoveSeries = (detailId: number, series: number) => {
        setSessionExercises(prevState => {
            const exercises = prevState[detailId] || [];
            const updatedExercises = exercises.filter(exercise => exercise.series !== series);
            return { ...prevState, [detailId]: updatedExercises };
        });
    };

    const handleExerciseChange = (detailId: number, index: number, field: keyof SessionExercise, value: string | number) => {
        setSessionExercises(prevState => {
            const exercises = prevState[detailId] || [];
            exercises[index] = { ...exercises[index], [field]: value };
            return { ...prevState, [detailId]: exercises };
        });
    };

    const handleSubmit = async () => {
        try {
            const sessionResponse = await axios.post(`http://localhost:8080/api/workout-plans/sessions`, {
                userId: userId,
                planId: planId,
                sessionDate: sessionDate
            });
            const sessionId = sessionResponse.data.sessionId;

            for (const detailId in sessionExercises) {
                for (const exercise of sessionExercises[detailId]) {
                    await axios.post(`http://localhost:8080/api/workout-plans/session-exercises`, {
                        sessionId: sessionId,
                        detailId: exercise.detailId,
                        series: exercise.series,
                        weight: exercise.weight,
                        repetitionsCompleted: exercise.repetitionsCompleted,
                        tempoUsed: exercise.tempoUsed,
                        restTimeUsed: exercise.restTimeUsed,
                        exerciseNotes: exercise.exerciseNotes
                    });
                }
            }
            // Handle success
        } catch (error) {
            console.error('Error submitting session:', error);
            // Handle error
        }
    };

    return (
        <div className="plan-details-container">
            <Toolbar />
            <h2 className="plan-name">Plan Name: {planName}</h2>
            <div className="date-picker-container">
                <label htmlFor="sessionDate">Select session date: </label>
                <input type="date" id="sessionDate" value={sessionDate} onChange={handleDateChange} />
            </div>
            <h2>Plan Details:</h2>
            <ul className="plan-details">
                {planDetails.map((detail) => (
                    <li key={detail.detailId}>
                        <p>Exercise: {detail.exerciseName} Sets: {detail.sets} Repetitions: {detail.repetitions} Tempo: {detail.tempo} Rest Time: {detail.restTime}</p>
                        <button className='buttonPlas' onClick={() => handleAddSeries(detail.detailId)}>+</button>
                        {sessionExercises[detail.detailId] && sessionExercises[detail.detailId].map((exercise, index) => (
                            <div key={index} className="exercise-form">
                                <p>Series: {exercise.series}</p>
                                <input
                                    type="number"
                                    placeholder="Weight"
                                    value={exercise.weight}
                                    onChange={(e) => handleExerciseChange(detail.detailId, index, 'weight', parseFloat(e.target.value))}
                                />
                                <input
                                    type="number"
                                    placeholder="Repetitions"
                                    value={exercise.repetitionsCompleted}
                                    onChange={(e) => handleExerciseChange(detail.detailId, index, 'repetitionsCompleted', parseInt(e.target.value))}
                                />
                                <input
                                    type="text"
                                    placeholder="Tempo Used"
                                    value={exercise.tempoUsed}
                                    onChange={(e) => handleExerciseChange(detail.detailId, index, 'tempoUsed', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Rest Time Used"
                                    value={exercise.restTimeUsed}
                                    onChange={(e) => handleExerciseChange(detail.detailId, index, 'restTimeUsed', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Exercise Notes"
                                    value={exercise.exerciseNotes}
                                    onChange={(e) => handleExerciseChange(detail.detailId, index, 'exerciseNotes', e.target.value)}
                                />
                                <button className='buttonMin' onClick={() => handleRemoveSeries(detail.detailId, exercise.series)}>-</button>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
            <button className='buttonSub' onClick={handleSubmit}>Submit Training Session</button>
        </div>
    );
};

export default AddWorkoutPage;
