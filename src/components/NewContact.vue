<template>
  <div class="new_contact">
    <div class="card card-box">
      <div class="back-btn text-start">
        <a href="javascript:" @click="back()"
          ><i class="fa fa-angle-left" aria-hidden="true"></i> BACK
        </a>
      </div>
      <div class="profile-details">
        <a href="#">
          <p class="text-center text-uppercase">
            {{data.firstName && data.firstName.substring(0, 1)
            }}{{data.lastName && data.lastName.substring(0, 1)}}
          </p>
        </a>

        <form class="pb-4">
          <div class="mb-3">
            <label class="form-label">First Name</label>
            <input
              type="text"
              class="form-control"
              v-model="data.firstName"
              placeholder="First Name"
              :readonly="doEdit"
            />
            <small class="text-danger" v-if="v$.data.firstName.$error">
              Invalid Firstname
            </small>
          </div>
          <div class="mb-3">
            <label class="form-label">Last Name</label>
            <input
              type="text"
              class="form-control"
              v-model="data.lastName"
              placeholder="Last Name"
              :readonly="doEdit"
            />
            <small class="text-danger" v-if="v$.data.lastName.$error">
              Invalid Lastname
            </small>
          </div>
          <div class="mb-3">
            <label class="form-label">Phone Number</label>
            <input
              type="text"
              class="form-control"
              v-model="data.phone"
              :readonly="doEdit"
              placeholder="+91 9876543210"
            />
            <small class="text-danger" v-if="v$.data.phone.$error">
              Invalid phone
            </small>
          </div>
          <div class="mb-3">
            <label class="form-label">Email Id</label>
            <input
              type="text"
              class="form-control"
              v-model="data.email"
              :readonly="doEdit"
              placeholder="abc@gmail.com"
            />
            <small class="text-danger" v-if="v$.data.email.$error">
              Invalid Email
            </small>
          </div>
        </form>

        <ul class="profile-links list-unstyled list-inline mb-0 text-center">
          <li
            class="edit-link list-inline-item"
            v-if="!doEdit || $store.state.selectedIndex==-1"
            @click="submitForm()"
          >
            <a href="#">
              <i class="fa fa-save" aria-hidden="true"></i>
            </a>
          </li>
          <li
            v-if="$store.state.selectedIndex!=-1 && doEdit"
            @click="doEdit = false"
            class="edit-link list-inline-item"
          >
            <a href="#">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </a>
          </li>

          <li
            v-if="$store.state.selectedIndex!=-1"
            class="delete-link list-inline-item"
          >
            <a href="javascript:" @click="deleteContact()">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    required,
    email
} from '@vuelidate/validators';
const phoneValidate = (value) => /^[+]*[0-9]*$/.test(value)
export default {
    name: 'NewContact',
    data() {
        return {
            v$: useValidate(),
            data: {
                firstName: '',
                lastName: '',
                phone: '',
                email: ''
            },
            doEdit: true
        }
    },
    computed: {
        // data(){
        //   const index = this.$store.state.selectedIndex;
        //   console.log(index)
        //   return this.$store.state.contacts[index]?this.$store.state.contacts[index]:{}
        // },
        initial() {
            const firstIntial = this.data.firstName ? this.data.firstName.substring(0, 1) : ''
            const lastIntial = this.data.lastName ? this.data.lastName.substring(0, 1) : ''
            return `${firstIntial}${lastIntial}`
        }
    },
    validations() {
        return {
            data: {
                firstName: {
                    required
                },
                lastName: {
                    required
                },
                phone: {
                    phoneValidate
                },
                email: {
                    required,
                    email
                }
            }
        }

    },
    methods: {
        submitForm() {
            this.v$.$validate() // checks all inputs
            if (!this.v$.$error) {
                if (this.$store.state.selectedIndex == -1) {
                    this.$store.commit('newContact', this.data)
                } else {
                    this.$store.dispatch('updateContact', this.data)
                }

                this.$store.dispatch('makeSectionVisible', {
                    view: false,
                    edit: false,
                    list: true
                })
                // if ANY fail validation
                // alert('Form successfully submitted.')
            } else {
                // aler//t('Form failed validation')
            }
        },
        back() {

            this.$store.dispatch('selectedIndex', -1);

            this.$store.dispatch('makeSectionVisible', {
                view: false,
                edit: false,
                list: true
            })
        },
        deleteContact() {
            this.$store.dispatch('deleteContact');
            this.$store.dispatch('selectedIndex', -1);

            this.$store.dispatch('makeSectionVisible', {
                view: false,
                edit: false,
                list: true
            })
        }
    },
    mounted() {
        this.doEdit = this.$store.state.selectedIndex == -1 ? false : true
        const index = this.$store.state.selectedIndex;
        console.log(index)
        this.data = this.$store.state.contacts[index] ? {
            ...this.$store.state.contacts[index]
        } : {}
    }
}
</script>

<style lang="scss" scoped></style>
