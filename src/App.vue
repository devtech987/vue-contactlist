<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-xl-4 col-lg-4 col-md-6">
        <ContactList v-if="view.list" />
      </div>

      <div class="col-xl-4 col-lg-4 col-md-6">
        <NewContact v-if="view.edit" msg="Welcome to Your Vue.js App" />
      </div>
    </div>
  </div>
</template>

<script>
import ContactList from './components/ContactList'
import NewContact from './components/NewContact'
import './style.css'
export default {
  name: 'App',
  components: {
    ContactList, NewContact
  },

  computed:{
    view() {
      return  this.$store.state.activeCard
    }
  },
  methods:{
    addContact(){
      this.$store.dispatch('makeSectionVisible',{
        view: false,
        edit: true,
        list: false
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
