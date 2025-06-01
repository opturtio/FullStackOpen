import {v1 as uuid } from 'uuid';
import patientsData from '../../data/patientsEntries';
import { NonSensitivePatientData, Patient, NewPatientEntry } from '../types';

const getPatients = (): Patient[] => {
    return patientsData;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry: Patient = {
        id: uuid(),
        ...entry
    };

    patientsData.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    getNonSensitivePatientData,
    addPatient
};