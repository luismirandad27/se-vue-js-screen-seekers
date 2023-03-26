<template>
    <div class="slider movie-items">
        <div class="container">
        <h1>This is the admin page, Construction on-going</h1>
        
        <div class="container">
            <button type="submit" @click="getAllMovies">getMovie</button>
            <button type="submit" @click="addMovie">addMovie</button>
        </div>
        <div>
            <table>
                <tr>
                    <td>ID</td>
                    <td>TItle</td>
                    <td>Update This Movie</td>
                </tr>
                <tr v-for="movie in result.content" :key="movie.id">
                    <td><router-link :to="'/adminPage/'+movie.id">{{ movie.id }}</router-link></td>
                     <td>{{ movie.title }}</td>
                     <td><router-link :to="'/adminPageUpdate/'+movie.id">Update This Movie</router-link></td>
                     <button type="submit" @click="deleteMovie(movie.id)">DELETE THIS MOVIE</button>
                </tr>
                <div>
                    <!-- {{ result }} -->
                </div>
            </table>
        </div>
        </div>
    </div>
</template>

<script>
// import { response } from 'express';
import Admin from '../services/admin.service.js';
export default{
    name:"AdminPage",
    data(){
        return{
            result:{}
        }
    },
    methods:{
        async getAllMovies(){
            const response = await Admin.getMovies();
            this.result=response;
            console.log(response);
           
        },
        addMovie(){
            this.$router.push("/adminPageaddMovie");
        },
        deleteMovie(id){
            const response=Admin.deleteaMovie(id);
            this.result=response;
        }
    }
}
</script>
