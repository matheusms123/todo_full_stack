<template>
    <div id="principal">
        <div id="container">
            <h1>
                Tarefas cumpridas
            </h1>
            <ul>
                <li v-for="task in tasks" :key="task._id">
                    <p>{{ task.title }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tasks: []
        }
    },
    created() {
        this.todasTask()
    },
    methods: {
        async todasTask() {

            const token = this.$store.getters.token;

            await fetch("http://localhost:3000/task/complete", {
                method: "GET",
                headers: {
                    "auth-token": token,
                    "Content-type": "application/json"
                }
            })
                .then((resp) => resp.json())
                .then((data) => {

                    this.tasks = data.task


                })
                .catch((error) => {
                    console.log(error)
                })

        }
    }
}

</script>

<style scoped> 
#principal{
    display: flex;
    justify-content: center;
}

#container{
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 2px ;
    padding: 100px 50px;
}

#container h1{
    margin-top: 20px;
    margin-bottom: 20px;
}

#container li{
    border-bottom: 2px solid black;
    font-size: 1.6em;
    list-style: none;
    color: rgb(43, 204, 14);
}

li p {
    margin-left: 10px;
}
</style>