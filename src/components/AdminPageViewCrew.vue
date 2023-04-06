<template>
    <div class="slider movie-items">
      <div class = "container">
      <h1>SAMPLE data for individual Crew</h1>
      <h2>{{ id }}</h2>
      <h3>{{ id2 }}</h3>
      <table>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                </tr>
                <tr>
                    <td>{{object.id}}</td>
                    <td>{{object.firstName}}</td>
                     
                </tr>
                <div>
                    <!-- {{ result }} -->
                </div>
                <div>
                    {{ object }}
                </div>
            </table>
        </div>
    </div>
  </template>

<script>
import Admin from '../services/admin.service.js'; 

export default {
  name: 'HelloWorld2',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id2:"",
      object:{}
    }
  },
  computed: {
    loggedIn() {
      var loggedInValue = this.$store.state.auth.status.loggedIn;
      return loggedInValue;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser != null)
        return this.$store.state.auth.user.roles.includes("ROLE_ADMIN");
      else return false;
    },
    id () {
      return this.$route.params.id
    }
  },
  methods:{
      async getACrew(){
          try{
              const response = await Admin.getCrewById(this.id);
          
          this.object=response;
          console.log(response);
          }catch(error){
              this.object="ERROR";
          }
      }
  },
  mounted(){
    if(this.loggedIn && this.isAdmin){
      this.getACrew();
    }else{
      this.$router.push("/error");
    }
  }
}
</script>