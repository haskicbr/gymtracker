import { DogeGymState } from "@/typings/interfaces";
import { RequestService } from "@/services/index";

const ShareService = {
  async createLink(state: DogeGymState) {
    return await RequestService.post('/share/link', state);
  },

  async getStateByUid(uid: string): Promise<DogeGymState> {

    const response = await RequestService.get(`/share/link/${uid}`);

    return JSON.parse(response.data.content) as DogeGymState;

  }
}

export default ShareService
