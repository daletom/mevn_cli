<template>
  <section class="mt-5">
    <div class="container mb-4">
      <div class="row">
        <div class="col-md-12">
          <div class="card" v-if="addState">
            <div class="card-body">
              <div class="card-title mb-4">
                <h4>Add Person</h4>
              </div>
              <form @submit.prevent="addNewUser">
                <div class="form-group">
                  <label for="title">Name</label>
                  <input type="text" v-model="userDetails.name" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="artist">Position</label>
                  <input type="text" v-model="userDetails.position" class="form-control" />
                </div>
                <!-- <div class="form-group">
                  <label for="artist">Image</label>
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="customFile" ref="file" v-on:change="handleFileUpload()" />
                    <label class="custom-file-label" for="customFile">Choose file</label>
                  </div> 
                </div>-->
                <div class="form-group">
                  <button class="btn btn-primary" :disabled="isDisabled">
                      <span
                        class="spinner-border"
                        v-if="addLoading"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card bg-light p-1 showdow-sm">
            <div class="card-title">
              <button
              class="btn btn-info m-3"
              @click="initForm"
              >{{addState?"Cancel":"Add New User"}}</button>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Date created</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <div
                  v-if="userLoading"
                  class="spinner-border"
                  style="width: 3rem; height: 3rem;"
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
                <tbody v-else>
                  <tr v-for="(user, index) in alluser" :key="index">
                    <td>{{ index +1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.position }}</td>
                    <td>{{ user.createdAt }}</td>
                    <td>
                      <button class="btn btn-info" @click="deleteUser(user._id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
    data() {
        return {
            userDetails: {
              name: '',
              position: '',
              image: ''
            },
            alluser: [],
            userLoading: false,
            isValid: false,
            addLoading: false,
            addState: false
        }
    },
    computed: {
        isDisabled: function() {
            if (
                this.userDetails.name === '' ||
                this.userDetails.position === ''
            ) {
                return !this.isValid
            }
        }
    },
    methods: {
        initForm() {
            this.addState = !this.addState
        },
        handleFileUpload() {
            this.userDetails.user = this.$refs.file.files[0]
            console.log(this.user.type)
        },
        async getAllUsers() {
            this.userLoading = true
            try {
                let data = await this.$axios.$get('/api')
                this.alluser = data
                this.userLoading = false
            } catch (err) {
                this.userLoading = false
                swal('Error', 'Error Fetching Users', 'error')
            }
        },
        addNewUser() {
            /*let types = /(\.|\/)(jpg|png|jpeg)$/i
            if (
                types.test(this.userDetails.user.name) ||
                types.test(this.userDetails.user.position)
            ) {
                let formData = new Formdata()
                formData.append('name', this.userDetails.name)
                formData.append('position', this.userDetails.position)
                this.addLoading = true
                this.$axios
                  .$post('/api', formData)
                  .then(response => {
                      console.log(response)
                      this.addLoading = false
                      this.userDetails = {}
                      this.getAllUsers()
                      swal('Success', 'New User Added', 'success')
                  })
                  .catch(err => {
                      this.addLoading = false
                      swal('Error', 'Something went wrong', 'error')
                      console.log(err)
                  })
            } else {
              swal('Error', 'Invalid file type', 'error')
              return !this.isValid
            }*/
            try {
                let formData = new Formdata()
                formData.append('name', this.userDetails.name)
                formData.append('position', this.userDetails.position)
                this.addLoading = true
                this.$axios
                  .$post('/api', formData)
                  .then(response => {
                      console.log(response)
                      this.addLoading = false
                      this.userDetails = {}
                      this.getAllUsers()
                      swal('Success', 'New User Added', 'success')
                  })
            } catch (err) {
                this.addLoading = false
                swal('Error', 'Something went wrong', 'error')
                console.log(err)
            }
        }
    },
    created() {
        this.getAllUsers()
    }
}
</script>