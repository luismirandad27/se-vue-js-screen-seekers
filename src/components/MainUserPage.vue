<template>
    <h1>sad</h1>
</template>
  
  <script>

  export default {
    data(){
      return {};
    },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted(){
    if(!this.currentUser){
      this.$router.push({name:'MainPage'});
    }
  }
};
  </script>
  
  
  