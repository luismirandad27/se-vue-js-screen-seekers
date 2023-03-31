<template>
    <div class="slider movie-items">
        <div class="form-style-1 user-pro">
            <h1>This is the admin page, Adding a Movie</h1>

            
            <div class="container">
                <form>
                    <table>
                        <tr>
                            <td><h4>Movie Title</h4></td>
                            <td><input type="text" v-model="model.title"></td>
                        </tr>
                        <tr>
                            <td>Movie Genre</td>
                            <td><input type="text" v-model="model.genre"></td>
                        </tr>
                        <tr>
                            <td>Release Date</td>
                            <td><input type="text" v-model="model.releaseDate" ></td>
                        </tr>
                        <tr>
                            <td>Length</td>
                            <td><input type="text" v-model="model.length"></td>
                        </tr>
                        <tr>
                            <td>Synopsis</td>
                            <td><input type="text" v-model="model.synopsis"></td>
                        </tr>
                        <tr>
                            <td>classificationRating</td>
                            <td><input type="text" v-model="model.classificationRating"></td>
                        </tr>
                        <tr>
                            <td>MovieTrailerLink</td>
                            <td><input type="text" v-model="model.movieTrailerLink"></td>
                        </tr>
                        <tr>
                            <td>IsInTheaters</td>
                            <td><input type="text" v-model="model.isInTheaters"></td>
                        </tr>
                        <tr>
                            <td>IsInStreaming</td>
                            <td><input type="text" v-model="model.isInStreaming"></td>
                        </tr>
                        <tr>
                            <td>IsComingSoon</td>
                            <td><input type="text" v-model="model.isComingSoon"></td>
                        </tr>
                        <tr>
                            <td>WhereToWatch</td>
                            <td><input type="text" v-model="model.whereToWatch"></td>
                            <!-- <td><textarea id="whereToWatch" v-model.trim.split="model.whereToWatch"></textarea></td> -->
                        </tr>
                    </table>
                </form>
                <div>
                    <button type="submit" @click="saveMovie">SAVE MOVIE</button>
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