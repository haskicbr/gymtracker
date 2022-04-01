interface WorkoutPlan {

}

interface Workout {
  id: string | null;
  title: string;
  description: string;
  repetition: { weight: number }[];
  // Праметры для упражнения ( настройка сидения итп )
  additionalParams?: string[]
}

interface DogeGymState {
  workouts: Workout[];
}

export {
  WorkoutPlan,
  Workout,
  DogeGymState
}
