interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  workouts: string[];
}


interface WorkoutGroup {
  name: string;
}


interface WorkoutRepeat {
  weight: number;
  repeats: number;
}

interface Workout {
  id: string | null;
  title: string;
  description: string;
  repeats: WorkoutRepeat[];
  isRepeated?:boolean;



  // Праметры для упражнения ( настройка сидения итп )
  additionalParams?: string[]
}

interface DogeGymState {
  workoutPlans: WorkoutPlan[];
  workouts: Workout[];
}

interface DogeGymGetters {
  getWorkoutById:  Workout | undefined
}



export {
  WorkoutPlan,
  Workout,
  WorkoutRepeat,
  DogeGymState,
  DogeGymGetters
}
