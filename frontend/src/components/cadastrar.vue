<template>
    <div class="container">
        <h1>Cadastrar:</h1>
        <form action="" @submit="register($event)">
        
            <div class="input-container">
                <label for="name">Nome:</label>
                <input type="text" name="name" v-model="name" placeholder="Digite seu nome...">
            </div>
            <div class="input-container">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email" placeholder="exemplo@gmail.com...">
            </div>
            <div class="input-container">
                <label for="password">Senha:</label>
                <input type="password" v-model="password" name="password">
            </div>
            <div class="input-container">
                <label for="confirmpassword">DIgite a senha novamnete:</label>
                <input type="password" v-model="confirmpassword" name="confirmpassword">
            </div>
            <div>
                <input type="submit" id="btn" value="Cadastrar">
            </div>
        </form>
    </div>
</template>


<script>
export default {
    data(){
        return{
            name: null,
            email: null,
            password: null,
            confirmpassword: null,
            msg: null,
            msgClass: null
        }
    },
    methods: {
        async register(e) {
            e.preventDefault()

            const data = {
                name: this.name,
                email: this.email,
                password: this.password,
                confirmpassword: this.confirmpassword
            }

            const dataJson = JSON.stringify(data)

            await fetch("http://localhost:3000/user/create", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: dataJson
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)

                let auth = false

                if(data.error) {
                    this.msg = data.error
                    this.msgClass = 'error'
                } else {
                    auth = true

                    this.msg = data.msg
                    this.msgClass = 'sucess'

                    this.$store.commit("authenticate" ,{ token: data.token, userId: data.UserId})
                }

                setTimeout(() => {
                    if(!auth) {
                        this.msg = null
                    } else {
                        this.$router.push('/')
                    }
                }, 2000)



            })
        }
    }

}

</script>

<style scoped>

.container {
    display:  flex;
    flex-direction: column;
    align-items: center;
    margin-top: 120px;
    font-size: 1.2em;
}
.container h1 {
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