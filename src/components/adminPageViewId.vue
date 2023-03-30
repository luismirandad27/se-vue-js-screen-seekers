<template>
    <div class="slider movie-items">
      <div class = "container">
      <h1>SAMPLE data for individual movies</h1>
      <h2>{{ id }}</h2>
      <h3>{{ id2 }}</h3>
      <table>
                <tr>
                    <td>ID</td>
                    <td>TItle</td>
                </tr>
                <tr>
                    <td>{{object.id}}</td>
                    <td>{{object.title}}</td>
                     
                </tr>
                <div>
                    <!-- {{ result }} -->
                </div>
                <div>
                    {{ object }}
                </div>
                <div>
                  <br>
                  {{ crewNames }}
                </div>
                <div>
                  <select name="crewName" id="crewName" v-model="crewId">
                    <option v-for="crew in crewNames" :key="crew.id" :value="crew.id">
                        {{ crew.firstName }}
                    </option>
                  </select>
                </div>
                <br>
                crew id selectd + {{ crewId }}
                {{ model }}
            </table>
            <br>
            <div>
              <form>
              <table>
                <tr>
                  <td>movieRole</td>
                  <td><input type="text" id="movieRole" v-model="model.movieRole"></td>
                </tr>
                <tr>
                  <td>characterName</td>
                  <td><input type="text" id="characterName" v-model="model.characterName"></td>
                </tr>
              </table>
            </form>
            <button type="submit" @click="sendForm">Send</button>
            <button type="submit" @click="showProdCrew">Show Crew for this movie</button>
            </div>
            <br>
            {{ crewForThisMovie.data }}

            <table>
              <h1>Crew for this movie</h1>
              <tr>
                <td>name</td>
                <td>role</td>
              </tr>
              <tr v-for="x in crewForThisMovie.data" :key="x.id">
                <td >
                  {{ x.charName }} - {{ x.crewMember.firstName  }}
                </td>
                <td>
                  <button @click="remove">Remove</button>
                </td>
              </tr>
              

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
        object:{},
        crewNames:{},
        crewId:"",
        model:{
          movieRole:"",
          characterName:""
        },
        crewForThisMovie:{}
      }
    },
    computed: {
      id () {
        return this.$route.params.id
      }
    },
    methods:{
        async getAmovie(){
            try{
                const response = await Admin.getMovieById(this.id);
            
            this.object=response;
            console.log(response);
            }catch(error){
                this.object="ERROR";
            }
            
            
        },

        async getAllCew(){
          
          // this.crewNames.push(Admin.getCrews());
          this.crewNames = await Admin.getCrews();
          console.log(this.crewNames);
        },

        async sendForm(){
          try{
            await Admin.addCrewMemberToMovie(this.crewId,this.model, this.id);
          }catch(error){
            console.log("ERror is " + error)
          }
          
        },

        async showProdCrew(){
          try{
            this.crewForThisMovie=  await Admin.showCrewForThisMovie(this.id);
          }catch(error){
            console.log("ERror is " + error)
          }
        },

        async remove(){
          try{
            await Admin.removeCrew(this.crewId, this.id);
          }catch(error){
            console.log("ERror is " + error)
          }
        }
    },
    mounted(){
        this.getAmovie();
        this.getAllCew();
        
    }
  }
  </script>