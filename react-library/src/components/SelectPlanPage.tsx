import React, { useState } from 'react';
import './styles/SelectPlanPage.css';
import Toolbar from './Toolbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedPlans, setSelectedPlans] = useState<TrainingPlan[] | null>(null);

    const navigate = useNavigate();

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        try {
            const response = await axios.get<User>(`http://localhost:8080/users/email/${term}`);
            const user = response.data;
            setSelectedUser(user || null);
            if (user) {
                const plansResponse = await axios.get<TrainingPlan[]>(`http://localhost:8080/api/workout-plans/user/${user.userId}`);
                setSelectedPlans(plansResponse.data || null);
            } else {
                setSelectedPlans(null);
            }
        } catch (error) {
            console.error('Error searching for user or fetching plans:', error);
            setSelectedUser(null);
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
            <div className="search-section">
                <h2>Search for a User</h2>
                <input type="email" value={searchTerm} onChange={handleSearch} />
                {searchTerm && !selectedUser && <p>User not found.</p>}
                {!searchTerm && <p>Enter the email address you want to search for.</p>}
                {selectedUser && <p>Selected user: {selectedUser.email}</p>}
            </div>
            {selectedPlans ? (
                <div>
                    {selectedPlans.map((plan) => (
                        <div key={plan.planId} className="plan-item">
                            <h2>{plan.planName}</h2>
                            <button onClick={() => startTraining(plan)}>Start training</button>
                        </div>
                    ))}
                </div>
            ) : (
                searchTerm.trim() !== '' && selectedUser && <p>No plans found for the selected user.</p>
            )}
        </div>
    );
};

export default SelectPlanPage;
