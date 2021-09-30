<template>
  <nav aria-label="breadcrumb ">
    <ol class="breadcrumb bg-transparent">
      <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
      <li class="breadcrumb-item active" aria-current="page">Add</li>
    </ol>
  </nav>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="tutorial.description"
          name="description"
        />
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script>
import AppDataService from "../services/AppDataService";
    export default {
        name: "add-tutorial",
        data() {
            return {
                tutorial: {
                    title: "",
                    description: "",
                    published: false
                },
                submitted: false
            };
        },
        methods: {
            saveTutorial() {
                var data = {
                    title: this.tutorial.title,
                    description: this.tutorial.description,
                    published: false
                };

                AppDataService.create(data)
                    .then(() =>{
                        console.log("Created new item successfully!");
                        this.submitted = true;
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },

            newTutorial(){
                this.submitted = false;
                this.tutorial = {
                    title: "",
                    description: "",
                    published: false
                };
            }
        }
    };
</script>

<style scoped>
    .breadcrumb-item + .breadcrumb-item::before {
        content: ">";
    }
</style>