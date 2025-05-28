interface Info { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const sum = (numbers: number[]): number => numbers.reduce((acc, num) => acc + num, 0);

const createRateDesc = (rating: number): string => {
  switch(rating) {
    case 1:
      return 'try more';
    case 2:
      return 'not too bad but could be better';
    case 3:
      return 'great job';
    default:
      throw new Error('Something went wrong');
  }
};

export const calculateExercises = (exerciseHours: number[], target: number): Info => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(d => d != 0).length;
  const average = sum(exerciseHours)/periodLength;
  const success = average > target ? true : false;
  const rating = average >= 2.5 ? 3 : average >= 1.6 ? 2 : 1;
  const ratingDescription = createRateDesc(rating);

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
    };
};

interface Values {
    exerciseHours: number[];
    target: number;
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  
  const exerciseHours = args.slice(3,args.length).map(Number);
  const target = Number(args.slice(2,3));

  return {
    exerciseHours: exerciseHours,
    target: target
  };
};

if (require.main === module) {
  try {
      const { exerciseHours , target } = parseArguments(process.argv);
      console.log(calculateExercises(exerciseHours, target));
  } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
      }
      console.log(errorMessage);
  }
}