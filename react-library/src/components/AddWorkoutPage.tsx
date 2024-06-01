import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './styles/AddWorkoutPage.css';

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

const AddWorkoutPage: React.FC = () => {
    const location = useLocation();
    const { planId, planName, userId } = location.state;
    const [planDetails, setPlanDetails] = useState<PlanDetail[]>([]);
    const [sessionDate, setSessionDate] = useState<string>(''); // State dla daty

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

    const handleSubmit = async () => {
        try {
            await axios.post(`http://localhost:8080/api/workout-plans/sessions`, {
                userId: userId, // Dodaj userId do danych wysyłanych do backendu
                planId: planId,
                sessionDate: sessionDate
            });
            // Obsługa sukcesu
        } catch (error) {
            console.error('Error submitting session:', error);
            // Obsługa błędu
        }
    };

    return (
        <div className="plan-details-container">
            <h2 className="plan-name">Plan Name: {planName}</h2>
            <div className="date-picker-container">
                <label htmlFor="sessionDate">Select session date: </label>
                <input type="date" id="sessionDate" value={sessionDate} onChange={handleDateChange} />
            </div>
            <h2>Plan Details:</h2>
            <ul className="plan-details">
                {planDetails.map((detail, index) => (
                    <li key={index}>
                        <p>Exercise: {detail.exerciseName} Sets: {detail.sets} Repetitions: {detail.repetitions} Tempo: {detail.tempo} Rest Time: {detail.restTime}</p>
                    </li>
                ))}
            </ul>
            <button onClick={handleSubmit}>Submit Training Session</button>
        </div>
    );
};

export default AddWorkoutPage;
