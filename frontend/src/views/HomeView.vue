



<template>
  <div class="principal">
    <h1>todas as tasks</h1>
    <div class="container">

      <ul id="task" class=" fa ul">

        <li id="t-cont" v-for="task in tasks" :key="task.id" class="fa-li">
          <div id="lis">
            <h1 class="title">{{ task.title }} </h1>
            <h1 class="btn" @click="btn(task._id)"></h1>
            <router-link id="link" :to="`/task/usertask/${task._id}`">VER </router-link>
          </div>
          <p>{{ task.description }}</p>
        </li>
        <!-- <p id="description">{{ task.description }}</p> -->

      </ul>
    </div>
  </div>
</template>
<script>

export default {
  //
  // const pegar o complete do backend e tranformar o valor dele comum toggle
  // para cada task
  //

  data() {
    return {
      tasks: [],

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
          console.log( this.tasks)

        })
        .catch((error) => {
          console.log(error)
        })

    },
    //fazer botao que mexe no patch e atualiza o true
    async btn(id) {

      const data = {
        complete: true
      }

      const dataJsaon = JSON.stringify(data)
      const token = this.$store.getters.token

      await fetch(`http://localhost:3000/task/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": 'application/json',
          "auth-token": token
        },
        body: dataJsaon
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })

        this.todasTask()
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
  border: 2px solid;
  padding: 60px;
}

.title {
  cursor: pointer;
  margin-bottom: 5px;
  margin-top: 10px;
}

#task {
  margin-top: 5px;
}

#t-cont {
  display: flex;
  flex-direction: column;
  
  border-bottom: solid 1px;
}

#t-cont #title {
  margin-left: 30px;
  margin-right: 10px;
}

#check {
  width: 30px;
  margin-left: 10px;
  cursor: pointer;
}

#description {
  margin-left: 80px;
}

a {
  text-decoration: none;
  color: black;
}

.certo {
  color: green;
  text-decoration: line-through;
}

#link {
  margin-top: 21px;
}

.btn {
  border: solid black 1px;
  padding: 7px;
  height: 5px;
  width: 8px;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}

#lis{
  display: flex;
  align-items: baseline;
}

p{
  margin-bottom: 10px;
  margin-left: 30px;
  font-size: 1.2em;
}
</style>
