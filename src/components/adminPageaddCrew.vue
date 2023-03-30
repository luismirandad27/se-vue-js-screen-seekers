<template>
    <div class="slider movie-items">
        <div class="container">
            <h1>This is the admin page, Adding a Crew</h1>

            
            <div class="container">
                <form>
                    <table>
                        <tr>
                            <td>First Name</td>
                            <td><input type="text" id="firstName" v-model="model.firstName"></td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td><input type="text" id="lastName" v-model="model.lastName"></td>
                        </tr>
                        <tr>
                            <td>Date of Birth</td>
                            <td><input type="text" id="dateOfBirth" v-model="model.dateOfBirth" ></td>
                        </tr>
                        <tr>
                            <td>Nationality</td>
                            <td><input type="text" id="nationality" v-model="model.nationality"></td>
                        </tr>
                        <tr>
                            <td>Award</td>
                            <td><input type="text" id="award" v-model="model.award"></td>
                        </tr>
                       
                        
                    </table>
                </form>
                <div>
                    <button type="submit" @click="saveCrew">SAVE Crew</button>
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