import diagnosesData from '../data/diagnosesEntries';

import { Diagnose } from '../src/types';

const diagnoses: Diagnose[] = diagnosesData;

const getEntries = (): Diagnose[] => {
    return diagnoses;
};

const addDiagnose = () => {
    return null;
};

export default {
    getEntries,
    addDiagnose
};