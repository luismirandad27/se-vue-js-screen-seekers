<template>
    <div class="slider movie-items">
        <div class="container">
        <h1>This is the admin page, Construction on-going</h1>
        
        <div class="container">
            <button type="submit" @click="getAllMovies">getMovies</button>
            <button type="submit" @click="addMovie">addMovie</button>
            <button type="submit" @click="deleteAll">Remove All Movies</button>
            <button type="submit" @click="addCrew">Add a Crew Member</button>
            <button type="submit" @click="getAllCrew">Get all Crew Member</button>
            <button type="submit" @click="deleteAllCrew">Delete all Crew Member</button>
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
            <table>
                <tr>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Update This Crew</td>
                </tr>
                <tr v-for="c in resultCrew" :key="c.id">
                    <!-- <td>TEST</td> -->
                    <td><router-link :to="'/crew/'+c.id">{{ c.firstName }}</router-link></td>
                     <td>{{ c.lastName }}</td>
                     <td><router-link :to="'/adminPageUpdateCrew/'+c.id">Update This Crew</router-link></td>
                     <button type="submit" @click="deleteCrew(c.id)">DELETE THIS Crew</button>
                </tr>
                <div>
                    <!-- {{ resultCrew }} -->
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
            result:{},
            resultCrew:{}
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
        },
        deleteAll(){
            Admin.deleteAllMovies();
        },
        addCrew(){
            this.$router.push("/adminPageaddCrew");
        },
        async getAllCrew(){
           const response= await Admin.getCrews();
           this.resultCrew=response;
        },
        deleteCrew(id){
            const response = Admin.deleteCrew(id);
            this.resultCrew=response;
        },
        deleteAllCrew(){
            const response = Admin.deleteAllCrew();
            this.resultCrew=response;
        },
        
    }
}
</script>
