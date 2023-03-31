<template>
    <div class="slider movie-items">
        <div class="form-style-1 user-pro">
            <form class="user">
						<h4>Add Movie
                            <br>
                            {{ result }}
                        </h4>
						<div class="row">
							<div class="col-md-6 form-it">
								<label>Movie Title</label>
								<input type="text" placeholder="edwardkennedy" v-model="model.title" id="title">
							</div>
							<div class="col-md-6 form-it">
								<label>MovieGenre</label>
								<input type="text" placeholder="edward@kennedy.com" v-model="model.genre" id="genre">
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 form-it">
								<label>Release Date</label>
								<input type="text" placeholder="Edward " v-model="model.releaseDate" id="releaseDate">
							</div>
							<div class="col-md-6 form-it">
								<label>Length</label>
								<input type="text" placeholder="Kennedy" v-model="model.length" id="length">
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 form-it">
								<label>Synopsis</label>
								<input type="text" placeholder="Kennedy" v-model="model.synopsis" id="synopsis">
							</div>
							<div class="col-md-6 form-it">
								<label>classificationRating</label>
								<input type="text" placeholder="Kennedy" v-model="model.classificationRating" id="classificationRating">
							</div>
						</div>
                        <div class="row">
							<div class="col-md-6 form-it">
								<label>MovieTrailerLink</label>
								<input type="text" placeholder="Kennedy" v-model="model.movieTrailerLink" id="movieTrailerLink">
							</div>
							<div class="col-md-6 form-it">
								<label>IsInTheaters</label>
								<select v-model="model.isInTheaters" id="isInTheaters">
								  <option value="true">Yes</option>
								  <option value="false">No</option>
								</select>
							</div>
						</div>
                        <div class="row">
							<div class="col-md-6 form-it">
								<label>IsInStreaming</label>
								<select v-model="model.isInStreaming" id="isInStreaming">
								  <option value="true">Yes</option>
								  <option value="false">No</option>
								</select>
							</div>
							<div class="col-md-6 form-it">
								<label>IsComingSoon</label>
								<select v-model="model.isComingSoon" id="isComingSoon">
								  <option value="true">Yes</option>
								  <option value="false">No</option>
								</select>
							</div>
						</div>
                        <div class="row">
							<div class="col-md-6 form-it">
								<label>WhereToWatch</label>
								<input type="text" placeholder="Kennedy" v-model="model.whereToWatch" id="whereToWatch">
							</div>
                            <div class="col-md-6 form-it">
								<label>Image Poster here</label>
								<select>
								  <option value="united">United States</option>
								  <option value="saab">Others</option>
								</select>
							</div>
							
						</div>
						
					</form>
                    <div class="row">
							<div class="col-md-2">
								<input class="submit" type="submit" value="save" @click="saveMovie">
							</div>
					</div>	
        </div>
    </div>
</template>
<script>
import Admin from '../services/admin.service.js'
export default{
    name:"adminAddMovie",
    data(){
        return{
            model:{
                title:"",genre:"", releaseDate:"", length:"", synopsis:"", classificationRating:"", movieTrailerLink:"", isInTheaters:"", isInStreaming:"", isComingSoon:"", whereToWatch:""
            },
            result:""
        }
    },
    methods:{
         saveMovie(){
            try{

                //this makes the whereToWatch an array, since array is the expected input by the movie controller for this property
                let whereToWatchInput = this.model.whereToWatch;
                let whereToWatchArray=[];
                whereToWatchArray.push(whereToWatchInput);
                this.model.whereToWatch = whereToWatchArray
                const returnVal=  Admin.saveMovie(this.model)
                
                this.result="nothing to see heree" + returnVal;
                // this.result=this.model;
                
            }catch(error){
                this.result="ERROR";
            }
           
                
            
        }
    },
    mounted(){
        this.result="TEST"
    }
}
</script>