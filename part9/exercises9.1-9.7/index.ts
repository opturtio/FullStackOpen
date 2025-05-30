import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_, res) => {
    res.send('Hello Full Stack!');
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height)) {
    res.status(400).send({ error: "malformed parameters" });
  }

  const bmi = calculateBmi(height, weight);

  res.status(200).send({
    weight: weight,
    height: height,
    bmi: bmi,
  });
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        res.status(400).send({ error: "missing parameters" });
    }
    
    if (!Array.isArray(daily_exercises) || !daily_exercises.every((n) => typeof n === "number") || typeof target !== "number") {
        res.status(400).send({ error: "malformatted parameters" });
    }
    
    const exercises: number[] = daily_exercises.map(Number) as number[];
    const result = calculateExercises(exercises, Number(target));
    res.status(200).json({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});