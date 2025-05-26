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
}

const calculateExercises = (exerciseHours: number[], target: number): Info => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(d => d != 0).length;
  const average = sum(exerciseHours)/periodLength
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
    }
}

try {
  const { }
}