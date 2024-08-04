import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors'; 
import Header from './components/Header';
import Footer from './components/Footer';
import { Container, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import PatientList from './pages/PatientList';
import AddPatient from './pages/AddPatient';
import UpdatePatientForm from './pages/UpdatePatient';
import AddPatientForm from './components/AddPatientForm';

import './App.css'; 

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: pink,
  },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline />
                <Header />
                <Container sx={{ mt: 4, mb: 4, maxWidth: '100%', minHeight: 800 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/patients" element={<PatientList />} />
                        <Route path="/add" element={<AddPatient />} />
                        <Route path="/add-patient" element={<AddPatientForm />} />
                        <Route path="/update/:id" element={<UpdatePatientForm />} />
                    </Routes>
                </Container>
                <Footer />
            </Router>
        </ThemeProvider>
    );
};

export default App;