import { DogeGymState } from "@/typings/interfaces";
import axios from "axios";



const StateCSVService = {
  async uploadState(state: DogeGymState) {
    return await axios.post('http://localhost:3000/workouts/download-plan', state);
  }
}


export default StateCSVService
