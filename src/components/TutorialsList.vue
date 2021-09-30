<template>
  <nav aria-label="breadcrumb ">
    <ol class="breadcrumb bg-transparent">
      <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">Tutorials</li>

    </ol>
  </nav>
  <div class="list row">
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <tutorial-details
          :tutorial="currentTutorial"
          @refreshList="refreshList"
        />
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataService from "../services/AppDataService";
import TutorialDetails from "./Tutorial"
    export default {
        name: "tutorials-list",
        components: { TutorialDetails },
        data() {
            return {
                tutorials: [],
                currentTutorial: null,
                currentIndex: -1
            };
        },
        methods: {
            onDataChange(items) {
                let _tutorials = [];

                items.forEach((item) => {
                    let key = item.key;
                    let data = item.val();
                    _tutorials.push({
                        key: key,
                        title: data.title,
                        description: data.description,
                        published: data.published,
                    });
                });

                this.tutorials = _tutorials;
            },

            refreshList(){
                this.currentTutorial = null;
                this.currentIndex = -1;
            },

            setActiveTutorial(tutorial, index){
                this.currentTutorial = tutorial;
                this.currentIndex = index;
            },

            removeAllTutorials(){
                AppDataService.deleteAll()
                    .then(() => {
                        this.refreshList();
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },
        },
        mounted(){
            AppDataService.getAll().on("value", this.onDataChange);
        },
        beforeUnmount(){
            AppDataService.getAll().off("value", this.onDataChange);
        }
    }
</script>

<style scoped>
    .breadcrumb-item + .breadcrumb-item::before {
        content: ">";
    }
</style>