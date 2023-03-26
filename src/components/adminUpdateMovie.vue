<template>
    <div class="slider movie-items">
        <div class="container">
            <h1>This is the admin page, Updating a Movie</h1>

            
            <div class="container">
                <form>
                    <table>
                        <tr>
                            <td>Movie Title</td>
                            <td><input type="text" id="title"  v-model="model.title" ></td>
                        </tr>
                        <tr>
                            <td>Movie Genre</td>
                            <td><input type="text" id="genre" v-model="model.genre"></td>
                        </tr>
                        <tr>
                            <td>Release Date</td>
                            <td><input type="text" id="releaseDate" v-model="model.releaseDate" ></td>
                        </tr>
                        <tr>
                            <td>Length</td>
                            <td><input type="text" id="length" v-model="model.length"></td>
                        </tr>
                        <tr>
                            <td>Synopsis</td>
                            <td><input type="text" id="synopsis" v-model="model.synopsis"></td>
                        </tr>
                        <tr>
                            <td>classificationRating</td>
                            <td><input type="text" id="classificationRating" v-model="model.classificationRating"></td>
                        </tr>
                        <tr>
                            <td>MovieTrailerLink</td>
                            <td><input type="text" id="movieTrailerLink" v-model="model.movieTrailerLink"></td>
                        </tr>
                        <tr>
                            <td>IsInTheaters</td>
                            <td><input type="text" id="isInTheaters" v-model="model.isInTheaters"></td>
                        </tr>
                        <tr>
                            <td>IsInStreaming</td>
                            <td><input type="text" id="isInStreaming" v-model="model.isInStreaming"></td>
                        </tr>
                        <tr>
                            <td>IsComingSoon</td>
                            <td><input type="text" id="isComingSoon" v-model="model.isComingSoon"></td>
                        </tr>
                        <tr>
                            <td>WhereToWatch</td>
                            <td><input type="text" id="whereToWatch"  v-model="model.whereToWatch"></td>
                            <!-- <td><textarea id="whereToWatch" v-model.trim.split="model.whereToWatch"></textarea></td> -->
                        </tr>
                    </table>
                </form>
                <div>
                    <button type="submit" @click="updateMovie">SAVE MOVIE</button>
                    <button type="submit" @click="deleteMovie(model.id)">DELETE THIS MOVIE</button>
                </div>
                <div>
                    {{ result }}
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
            result:""
            
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

        updateMovie(){
            try{
               const response2= Admin.updateMovie(this.id, this.model);
                this.result="nothing to see heree" + response2;
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