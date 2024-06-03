import React, { useState } from 'react';
import './styles/SelectPlanPage.css';
import './styles/global.css';
import Toolbar from './Toolbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchUser from './SearchUser';

interface User {
    userId: number;
    email: string;
}

interface TrainingPlan {
    planId: number;
    userId: number;
    planName: string;
}

const SelectPlanPage: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedPlans, setSelectedPlans] = useState<TrainingPlan[] | null>(null);
    const navigate = useNavigate();

    const fetchPlans = async (userId: number) => {
        try {
            const plansResponse = await axios.get<TrainingPlan[]>(`http://localhost:8080/api/workout-plans/user/${userId}`);
            setSelectedPlans(plansResponse.data || null);
        } catch (error) {
            console.error('Error fetching plans:', error);
            setSelectedPlans(null);
        }
    };

    const handleUserSelected = (user: User | null) => {
        setSelectedUser(user);
        if (user) {
            fetchPlans(user.userId);
        } else {
            setSelectedPlans(null);
        }
    };

    const startTraining = (plan: TrainingPlan) => {
        if (plan && selectedUser) {
            console.log('Selected plan:', plan.planId);
            console.log('Selected user:', plan.planName);
            console.log('Selected user:', selectedUser.userId);
            navigate('/add-workout', { state: { planId: plan.planId, planName: plan.planName, userId: selectedUser.userId } });
        }
    };

    return (
        <div className="select-plan-page">
            <Toolbar />
            <h1>Search plan</h1>
            <SearchUser onUserSelected={handleUserSelected} />
            {selectedPlans ? (
                <div className='plans-list'>
                    {selectedPlans.map((plan) => (
                        <div key={plan.planId} className="plan-item">
                            <h2> Plan name: {plan.planName} </h2>
                            <button className='start' onClick={() => startTraining(plan)}>Start training</button>
                        </div>
                    ))}
                </div>
            ) : (
                selectedUser && <p>No plans found for the selected user.</p>
            )}
        </div>
    );
};

export default SelectPlanPage;
