interface WorkoutPlan {

}


interface WorkoutRepeat {
  weight: number;
}

interface Workout {
  id: string | null;
  title: string;
  description: string;
  repeats: WorkoutRepeat[];
  // Праметры для упражнения ( настройка сидения итп )
  additionalParams?: string[]
}

interface DogeGymState {
  workouts: Workout[];
}

export {
  WorkoutPlan,
  Workout,
  WorkoutRepeat,
  DogeGymState
}
