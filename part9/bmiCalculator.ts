interface Values {
    height: number;
    weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/((height/100)**2);
    if (bmi < 18.5) {
        return 'Underweight'
    } else if (bmi < 25) {
        return 'Normal Range'
    } else if (bmi < 30) {
        return 'Overweight'
    } else {
        return 'Obese'
    }
}

const parseArguments = (args: string[]): Values => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}