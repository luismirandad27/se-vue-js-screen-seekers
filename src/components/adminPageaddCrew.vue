<template>
    <div class="slider movie-items">
        <div class="container">
            <h1>This is the admin page, Adding a Crew</h1>

            
            <div class="container">
                <form>
                    <div class="form-style-1 user-pro">
            <form class="user">
						<h4>Add Crew
                            <br>
                            {{ result }}
                        </h4>
						<div class="row">
							<div class="col-md-6 form-it">
								<label>First Name</label>
								<input type="text" placeholder="edwardkennedy" v-model="model.firstName" id="firstName">
							</div>
							<div class="col-md-6 form-it">
								<label>Last Name</label>
								<input type="text" placeholder="edward@kennedy.com" v-model="model.lastName" id="lastName">
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 form-it">
								<label>Date of Birth</label>
								<input type="text" placeholder="Edward " v-model="model.dateOfBirth" id="dateOfBirth">
							</div>
							<div class="col-md-6 form-it">
								<label>Nationality</label>
								<input type="text" placeholder="Kennedy" v-model="model.nationality" id="nationality">
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 form-it">
								<label>Award</label>
								<input type="text" placeholder="Kennedy" v-model="model.award" id="award">
							</div>
							
						</div>
                        
						
					</form>
                    <div class="row">
							<div class="col-md-2">
								
								<input class="submit" type="submit" value="save" @click="saveCrew">
							</div>
					</div>	
        </div>
                </form>
                <div>
                    <!-- <button type="submit" @click="saveCrew">SAVE Crew</button> -->
                </div>
                <div>
                    {{ result }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Admin from '../services/admin.service.js' 
export default{
    name:"adminPageaddCrew",
    data(){
        return{
            model:{
                firstName:"",
                lastName:"",
                dateOfBirth:"",
                nationality:"",
                award:"",
                createdAt:""
            },
            result:{}
        }
    },
    methods:{
        saveCrew(){
           let returnVal= Admin.saveCrew(this.model);
           this.result="nothing to see heree " + returnVal;
           console.log(returnVal);
        }
    }
}

</script>