import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PersonList from "./components/PersonList";
import Shape from './components/Shape';
import Home from './components/Home';
import { Person } from './store/features/personSlice';
import './App.css';
import './i18n'; // ตั้งค่า i18next
import { useTranslation } from 'react-i18next'; // ฮุคใช้งานการแปล
const App: React.FC = () => {
    const [selectedPerson, setSelectedPerson] = useState<Person | undefined>(undefined);

    
    return (
        <Router>
            <main>
                <div className="my-5 flex flex-col gap-4">
                    
                    
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<PersonList editPerson={setSelectedPerson} />} />
                    <Route path="/main" element={<Shape />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
