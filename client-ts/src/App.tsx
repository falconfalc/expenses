import React from 'react';
import logo from './logo.svg';
import './App.css';
import { StateProvider } from './utils/config/GlobalState';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <div className="App">
            <StateProvider>
                <Dashboard />
            </StateProvider>
        </div>
    );
}

export default App;
