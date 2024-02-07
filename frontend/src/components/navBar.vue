<template>
    <div class="container">
        <div class="container-logado">
            <router-link to="/"> Home</router-link>
            <router-link to="/adtask" v-show="authenticated"> Adicionar</router-link>
            <router-link to="/"  v-show="authenticated"> Completas</router-link>
        </div>
        <div class="container-logs">
            <router-link to="/" id="login" v-show="!authenticated"> log-in</router-link>
            <router-link to="/register" id="cadastrar" v-show="!authenticated"> cadastrar</router-link>
            <button @click="logout($event)" id="logout" v-show="authenticated" >Log-out</button>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {

    methods:{
        logout(e) {
            e.preventDefault()
            this.$store.commit("logout")
            setTimeout(() => {
                this.$router.push('/login')
            }, 200);
        }
    },  

    computed: {
        ...mapState([
            'authenticated'
        ])
    }
}

</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    font-size: 1.3em;
    color: BLACK;
    border-bottom: 3px solid black;
    margin-bottom: 20px;
    padding: 3px;
}



.container-logado {
    display: flex;
    justify-content: end;
    font-size: 1.2em;
    color: BLACK;
    margin-left: 50px;
}
.container-logs {
    display: flex;
    justify-content: end;
    font-size: 1.1em;
    color: BLACK;
}

.container a {
    text-decoration: none;
    color: BLACK;
    padding: 10px;
    border-radius: 5px;
}
.container-logado a {
    text-decoration: none;
    color: BLACK;
    padding: 15px;
    border-radius: 5px;
    margin-left: 200px;
}

.container a:hover {
    text-decoration: underline;
}

#login{
    background-color: rgb(2, 2, 227);
    color: white;
}
#login:hover{
    background-color: rgb(0, 0, 175);
    color: white;
}

#cadastrar {
    margin: 3px;
    margin-left: 10px;
}

#logout {
    padding: 5px 30px;
    color: white;
    background-color: rgb(184, 3, 3);
    margin-right: 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>