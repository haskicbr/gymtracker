import { DogeGymState } from "@/typings/interfaces";
import axios from "axios";

const ConvertStateService = {
  async convertToCSV(state: DogeGymState) {
    return await axios.post('https://api.dogegym.ru/workouts/convert-state-to-csv', state);
  },
  async convertToState(csv: string) {
    const result = await axios.post('https://api.dogegym.ru/workouts/convert-csv-to-state', { csv });
    const state: DogeGymState = result.data;
    return state;
  },
}


export default ConvertStateService
