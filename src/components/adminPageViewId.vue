<template>
    <div>
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
            </table>
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
            
            
        }
    },
    mounted(){
        this.getAmovie();
    }
  }
  </script>