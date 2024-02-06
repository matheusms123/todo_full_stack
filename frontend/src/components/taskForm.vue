<template>
    <div class="container">
        <div class="principal">
            <h1>Cadastrar:</h1>
        <form @submit="adicionar($event)">
        
            <div class="input-container">
                <label for="name">Titulo:</label>
                <input type="text" name="Titule" v-model="title"  placeholder="Titulo da task...">
            </div>
            <div class="input-container">
                <label for="description">Descrição:</label>
                <input type="text" name="description" v-model="description" placeholder="Descrição...">
            </div>
            <div class="input-check">
                <label for="description">Completo:</label>
                <input type="checkbox" name="description" v-model="completed" placeholder="Descrição...">
            </div>
            
            <div>
                <input id="btn" type="submit" value="Cadastrar">
            </div>
        </form>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            title: null,
            description: null,
            completed: null,
            msg: null,
            msgClass: null
        }
    },
    methods: {
        async adicionar(e) {
            e.preventDefault()
            console.log("olá")

            const data = {
                title: this.title,
                description: this.description,
                completed: this.completed
            }

            const dataJson = JSON.stringify(data)

            const token = this.$store.getters.token;

            await fetch("http://localhost:3000/task/create", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": token
                },
                body: dataJson
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)

                
                if(data.error) {
                    this.msg = data.error
                    this.msgClass = "error"
                } else {


                    this.msg = data.msg
                    this.msgClass = 'sucess'

                    // this.$store.commit("authenticate", {token: data.token, userId: data.userId})

                }

                setTimeout(() => {


                        this.msg = null

                        this.$router.push('/')

                }, 2000);

            })
        }
  
    }

}

</script>

<style scoped>
.principal {
    display:  flex;
    flex-direction: column;
    align-items: center;
    margin-top: 120px;
    font-size: 1.4em;
    border: 2px solid black;
    max-width: 800px;
    padding: 100px; 
    border-radius: 5px;
}

.container{
    display: flex;
    align-items: center;
    justify-content: center;
}
.principal h1 {
    margin-bottom: 70px;
}

.input-container {
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
}

.input-container input {
    width: 350px;
    height: 20px;
}
.input-check input{
    margin-left: 10px;
}


#btn{
    padding: 10px 20px;
    margin-left: 90px;
    margin-top: 20px;
    background-color: rgb(0, 0, 189);
    color: white;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#btn:hover {
    background-color: rgb(0, 0, 138);
}


</style>