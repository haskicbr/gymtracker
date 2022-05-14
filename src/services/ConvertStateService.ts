import { DogeGymState } from "@/typings/interfaces";
import { RequestService } from "@/services/index";

const ConvertStateService = {
  async convertToCSV(state: DogeGymState) {
    return await RequestService.post('/workouts/convert-state-to-csv', state);
  },
  async convertToState(csv: string) {
    const result = await RequestService.post('/workouts/convert-csv-to-state', { csv });
    const state: DogeGymState = result.data;
    return state;
  },
}


export default ConvertStateService
