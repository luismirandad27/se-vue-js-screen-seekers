<template>
    <div class="container">
        <h1>This is the admin page, Construction on-going</h1>
        
        <div class="container">
            <button type="submit" @click="getAllMovies">getMovie</button>
        </div>
        <div>
            <table>
                <tr>
                    <td>ID</td>
                    <td>TItle</td>
                </tr>
                <tr v-for="movie in result.content" :key="movie.id">
                    <td>{{ movie.id }}</td>
                     <td>{{ movie.title }}</td>
                     
                </tr>
                <div>
                    <!-- {{ result }} -->
                </div>
            </table>
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
           
        }
    }
}
</script>
