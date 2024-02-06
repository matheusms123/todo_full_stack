
<template>
  <div class="principal">
    <h1>todas as tasks</h1>
    <div class="container">

      <div id="task" v-for="task in tasks" :key="task.id">

        <div id="t-cont">
          <input type="checkbox" name="" id="check">
          <h1 id="title">{{ task.title }} </h1>
        </div>
        <p id="description">{{ task.description }}</p>

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

      await fetch("http://localhost:3000/task/all", {
        method: "GET",
        headers: {
          "auth-token": token,
          "Content-type": "application/json"
        }
      })
        .then((resp) => resp.json())
        .then((data) => {

          this.tasks = data.task

          this.tasks.forEach(tas => {
            console.log(tas)
          });

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
#title {
  cursor: pointer;
}

#task{
  border-bottom: 2px solid;
  margin-top: 5px;
}

#t-cont{
  display: flex;
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
  margin-left: 80px;
}
</style>
