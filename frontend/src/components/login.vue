<template>
    <div class="container">
        <h1>Log-in:</h1>
        <form action="" @submit="login($event)">

            <div class="input-container">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email" placeholder="exemplo@gmail.com...">
            </div>
            <div class="input-container">
                <label for="password">Senha:</label>
                <input type="password" v-model="password" name="password">
            </div>

            <div>
                <input type="submit" value="Cadastrar">
            </div>
        </form>
    </div>
</template>


<script>

export default {

    data() {
        return {
            email: null,
            password: null
        }
    },

    methods: {
        async login(e) {
            e.preventDefault()

            const data = {
                email: this.email,
                password: this.password
            }

            const datajson = JSON.stringify(data)
            
            await fetch("http://localhost:3000/user/login", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: datajson
            })
            .then((resp) => resp.json())
            .then((data) => {

                let auth = false

                if(data.error) {
                    this.msg = data.error
                    this.msgClass = "error"
                } else {
                    auth = true
                    this.msg = data.msg
                    this.msgClass = "sucess"

                    this.$store.commit("authenticate", {token: data.token, userId: data.userId})
                }

                setTimeout(() => {
                    if(!auth) {
                        this.msg = null
                    } else {
                        this.$router.push('/')
                    }
                }, 2000);

            })
        }
    }
}

</script>

<style scoped>
.container {
    display: flex;
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
</style>