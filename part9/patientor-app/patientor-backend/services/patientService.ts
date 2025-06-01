import patientsData from '../data/patientsEntries';
import { NonSensitivePatientData, Patient } from '../src/types';

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

export default {
    getPatients,
    getNonSensitivePatientData
};