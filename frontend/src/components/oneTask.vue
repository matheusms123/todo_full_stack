<template>
  <div class="principal">
    <h1>task:</h1>
    <div class="container">

      <div id="task">

        <div id="t-cont">
          <h1 id="title">{{ tasks.title }} </h1>
          <router-link to="/">editar</router-link>
        </div>
        <p id="description">{{ tasks.description }}</p>

      </div>
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
      const id = this.$route.params.id

      await fetch(`http://localhost:3000/task/usertask/${id}`, {
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
.principal {
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
}

.container {
  border: 2px solid ;
  padding: 60px;
}


#task{
  border-bottom: 2px solid;
  margin-top: 5px;
}

#t-cont{
  display: flex;
  align-items: baseline;
}

#t-cont a {
  text-decoration: none;
  color: black;
  cursor: pointer;
  font-size: 1.1em;
}
#t-cont a:hover {
  text-decoration: none;
  color: black;
  cursor: pointer;
  font-size: 1.3em;
}
#t-cont #title {
  margin-left: 30px;
  margin-right: 10px;
}
#check{
  width: 30px;
  margin-left: 10px;
  cursor: pointer;
}

#description {
  margin-bottom: 10px;
  margin-left: 30px;
  font-size: 1.2em;
}

</style>
