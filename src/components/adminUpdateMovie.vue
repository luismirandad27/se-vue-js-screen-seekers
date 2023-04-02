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
								<input type="file" @change="getPoster">
							</div>
							<div class="col-md-6 form-it">
								
								
								<label>Image Trailer here</label>
								<input type="file" @change="getPoster2">
							</div>
						
							
						</div>
						
					</form>
                    <div class="row">
							<div class="col-md-2">
								<input class="submit" type="submit" value="Update" @click="updateMovie">
							</div>
							<div class="col-md-2">
								<!-- <input class="submit"  value="POSTER" @click="getposter"> -->
								<!-- <a href="#" class="redbtn" @click="getposter">Change avatar</a> -->
							</div>
					</div>	
        </div>
    </div>
</template>

<script>
import Admin from '../services/admin.service.js'; 
export default {
    name:"adminUpdateMovie",
    data(){
        return{
            object:{},
            model:{
                title:"",genre:"", releaseDate:"", length:"", synopsis:"", classificationRating:"", movieTrailerLink:"", isInTheaters:"", isInStreaming:"", isComingSoon:"", whereToWatch:""
            },
            result:"",
			posterImage:null,
			trailerImage:null
            
        }
    },
    computed:{
        id(){
            return this.$route.params.id
        }
    },
    methods:{
        async getAmovie(){
            try{
                const response = await Admin.getMovieById(this.id);
            
            // this puts the value from the getAmovie function to the tempalte fields
            this.model=response;
            
            console.log(response);
            }catch(error){
                this.object="ERROR";
            }
            
            
        },



		getPoster(event) {
			this.posterImage=event.target.files[0];
    },getPoster2(event){
		this.trailerImage=event.target.files[0];
	},

        updateMovie(){
            try{
               const response2= Admin.updateMovie(this.id, this.model);
                this.result="nothing to see heree" + response2;
				
				const formData = new FormData();
				formData.append('poster-image', this.posterImage);
				formData.append('trailer-image', this.trailerImage);
				const res = Admin.uploadImage(this.id, formData);
				console.log(res);

			

            }catch(error){
                this.result="ERROR";
            }
        },
        deleteMovie(id){
            const response=Admin.deleteaMovie(id);
            this.result=response;
        }
    },
    mounted(){
        this.getAmovie();
        this.result="TEST"
        
    }
} 
</script>