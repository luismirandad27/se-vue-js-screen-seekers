<template>
    <div class="slider movie-items">
        <div class="container">
            <!-- <h1>This is the admin page, Adding a Crew</h1> -->

            
            <div class="container">
                <form>
                    <div class="form-style-1 user-pro">
            <form class="user">
						<h4>Add Crew To Moive {{ object.title }}
                            <br>
                            <!-- {{ result }} -->
                        </h4>
						<div class="row">
							<div class="col-md-6 form-it">
								<label>Creew</label>
                                <select name="crewName" id="crewName" v-model="crewId">
                    <option v-for="crew in crewNames" :key="crew.id" :value="crew.id">
                        {{ crew.firstName }}
                    </option>
                  </select>
								<!-- <input type="text" placeholder="edwardkennedy"> -->
							</div>
							<div class="col-md-6 form-it">
								<label>Movie Role</label>
								<input type="text" placeholder="edward@kennedy.com" v-model="model.movieRole">
							</div>
                            <div class="col-md-6 form-it">
								<label>Character Name</label>
								<input type="text" placeholder="edward@kennedy.com" v-model="model.characterName">
							</div>
						</div>
						
                        
						
					</form>
                    <div class="row">
							<div class="col-md-2">
								
								<input class="submit" type="submit" value="save" @click="sendForm">
							</div>
					</div>	
        </div>
                </form>
                <div>
                    <!-- <button type="submit" @click="saveCrew">SAVE Crew</button> -->
                </div>
                <div>
                    <!-- {{ result }} -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import Admin from '../services/admin.service.js';  
export default{
    name:"addCre",
    computed:{
        id(){
            return this.$route.params.id
        }
    },
    data(){
        return{
            object:{},
            crewNames:{},
            crewId:"",
            model:{
          movieRole:"",
          characterName:""
        },
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
          
        }
    },
    mounted(){
        this.getAmovie();
        this.getAllCew();
    }
}
</script>
