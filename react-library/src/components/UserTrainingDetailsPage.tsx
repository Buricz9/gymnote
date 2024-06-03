import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toolbar from './Toolbar';
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
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        if (searchTerm) {
            fetchUser();
        }
    }, [searchTerm]);

    const fetchUser = async () => {
        try {
            const response = await axios.get<User>(`http://localhost:8080/users/email/${searchTerm}`);
            const user = response.data;
            setSelectedUser(user);
            if (user) {
                fetchPlans(user.userId);
            } else {
                setSelectedPlans([]);
                setSelectedSessions([]);
                setSelectedSessionExercises([]);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            setSelectedUser(null);
            setSelectedPlans([]);
            setSelectedSessions([]);
            setSelectedSessionExercises([]);
        }
    };

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
            <div className="user-info">
                {selectedUser && <p>Selected user: {selectedUser.email}</p>}
            </div>
            <div className="search-section">
                <h2>Search for a User</h2>
                <input type="email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                {searchTerm && !selectedUser && <p>User not found.</p>}
                {!searchTerm && <p>Enter the email address you want to search for.</p>}
                {selectedUser && <p>Selected user: {selectedUser.email}</p>}
            </div>
            <div className="plans-list">
                <h2>Training Plans</h2>
                {selectedPlans.map(plan => (
                    <div key={plan.planId}>
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
