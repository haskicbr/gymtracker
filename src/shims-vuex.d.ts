import store  from '@/store/index';
import { Store } from "vuex";
import { DogeGymState } from "@/typings/interfaces";
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store:  Store<DogeGymState>
  }
}
