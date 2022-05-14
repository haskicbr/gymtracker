<script>
import { defineComponent } from "vue";
import { ShareService } from "@/services";
import { DogeGymState } from "@/typings/interfaces";
export default defineComponent({
  name: "StateFromSharedLink",


  async mounted() {
    const newState =  await ShareService.getStateByUid(this.$route.params.uid);

    console.log(newState)
    this.$store.replaceState({...this.$store.state, ...newState});
    this.$router.replace({
      name: 'workoutPlans'
    });
  }
});
</script>


<template>
  <div>
    statefrom shared link
  </div>
</template>
