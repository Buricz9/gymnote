import React, { useState, useEffect } from 'react';
import './styles/SelectPlanPage.css';
import Toolbar from './Toolbar';
import data from '../data/dataDetails.json';
import { Link, useNavigate } from 'react-router-dom';

interface TrainingPlan {
    name: string;
    plan: string;
    startDate: string;
    endDate: string;
}

const SelectPlanPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [plans, setPlans] = useState<TrainingPlan[]>(data);
    const [selectedPlan, setSelectedPlan] = useState<TrainingPlan[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSelectedPlan(null);
            return;
        }

        const matchedPlans = plans.filter(plan =>
            plan.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSelectedPlan(matchedPlans.length > 0 ? matchedPlans : null);

        console.log('Dane pobrane z pliku:', plans); // Dodaj ten console.log
    }, [searchTerm, plans]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const startTraining = () => {
        if (selectedPlan) {
            navigate('/edycja', { state: { selectedPlans: selectedPlan } });
        }
    };

    return (
        <div className="select-plan-page">
            <Toolbar />
            <div className="search-section">
                <h2>Szukaj osoby:</h2>
                <input
                    type="text"
                    placeholder="Wpisz nazwę osoby"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            {selectedPlan ? (
                <div>
                    {selectedPlan.map((plan, index) => (
                        <div key={index} className="plan-item">
                            <h2>{plan.name}</h2>
                            <p>Plan: {plan.plan}</p>
                            <button onClick={startTraining}>Start training</button>
                        </div>
                    ))}
                </div>
            ) : (
                searchTerm.trim() !== '' && <p>Brak danych dla podanej osoby lub więcej niż jedna pasująca osoba</p>
            )}
        </div>
    );
};

export default SelectPlanPage;
