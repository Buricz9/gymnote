import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toolbar from './Toolbar';
import SearchUser from './SearchUser';
import './styles/global.css';
import './styles/UserTrainingDetailsPage.css';

interface User {
    userId: number;
    email: string;
}

interface PlanDetail {
    planId: number;
    planName: string;
}

interface Session {
    sessionId: number;
    sessionDate: string;
    workoutPlan: {
        planId: number;
    };
}

interface SessionExercise {
    session: {
        sessionId: number;
    };
    exerciseName: string;
    sets: number;
    repetitions: number;
    tempo: string;
    restTime: string;
}

const UserTrainingDetailsPage: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedPlans, setSelectedPlans] = useState<PlanDetail[]>([]);
    const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);
    const [selectedSessionExercises, setSelectedSessionExercises] = useState<SessionExercise[]>([]);

    useEffect(() => {
        if (selectedUser) {
            fetchPlans(selectedUser.userId);
        } else {
            setSelectedPlans([]);
            setSelectedSessions([]);
            setSelectedSessionExercises([]);
        }
    }, [selectedUser]);

    const fetchPlans = async (userId: number) => {
        try {
            const plansResponse = await axios.get<PlanDetail[]>(`http://localhost:8080/api/workout-plans/user/${userId}`);
            setSelectedPlans(plansResponse.data);
            fetchSessions(plansResponse.data);
        } catch (error) {
            console.error('Error fetching plans:', error);
            setSelectedPlans([]);
            setSelectedSessions([]);
            setSelectedSessionExercises([]);
        }
    };

    const fetchSessions = async (plans: PlanDetail[]) => {
        try {
            const planIds = plans.map(plan => plan.planId);
            const promises = planIds.map(planId => axios.get<Session[]>(`http://localhost:8080/api/workout-plans/${planId}/sessions`));
            const responses = await Promise.all(promises);
            const sessions = responses.flatMap(response => response.data);
            setSelectedSessions(sessions);
            fetchSessionExercises(sessions);
        } catch (error) {
            console.error('Error fetching sessions:', error);
            setSelectedSessions([]);
            setSelectedSessionExercises([]);
        }
    };

    const fetchSessionExercises = async (sessions: Session[]) => {
        try {
            const sessionIds = sessions.map(session => session.sessionId);
            const promises = sessionIds.map(sessionId => axios.get<SessionExercise[]>(`http://localhost:8080/api/sessions/${sessionId}/exercises`));
            const responses = await Promise.all(promises);
            const sessionExercises = responses.flatMap(response => response.data);
            setSelectedSessionExercises(sessionExercises);
        } catch (error) {
            console.error('Error fetching session exercises:', error);
            setSelectedSessionExercises([]);
        }
    };

    return (
        <div className="user-training-details-page">
            <Toolbar />
            <h1>Display list of plans</h1>
            <SearchUser onUserSelected={setSelectedUser} />
            <div className="plans-list">
                <h2>Training Plans</h2>
                {selectedPlans.map(plan => (
                    <div key={plan.planId} className='training-plan'>
                        <h3>Nazwa planu: {plan.planName}</h3>
                        {selectedSessions.filter(session => session.workoutPlan.planId === plan.planId).map(session => (
                            <div key={session.sessionId}>
                                <p>Data treningu: {session.sessionDate}</p>
                                <ul>
                                    {selectedSessionExercises.filter(exercise => exercise.session.sessionId === session.sessionId).map((exercise, index) => (
                                        <li key={index}>
                                            <p>Exercise: {exercise.exerciseName} Sets: {exercise.sets} Repetitions: {exercise.repetitions} Tempo: {exercise.tempo} Rest Time: {exercise.restTime}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserTrainingDetailsPage;
