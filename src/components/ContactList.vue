<template>
  <div class="contact_list">
    <div class="card card-box">
      <div class="input-group mb-4 border rounded-pill p-1">
        <input
          type="search"
          placeholder="What're you searching"
          aria-describedby="button-addon3"
          class="form-control p-0 ps-2 bg-none border-0"
          @keyup="search($event)"
        />
        <div class="input-group-append border-0">
          <button
            id="button-addon3"
            type="button"
            class="btn btn-link text-success"
          >
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>

      <ul class="list-group contactlist">
        <li
          class="list-group-item mb-3 p-0"
          v-for="(val, index) in contactLists"
          @click="viewContact(val, index)"
          :key="index"
        >
          <div class="row">
            <div class="col-md-3 col-3">
              <img
                src="https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png"
                class=""
              />
            </div>
            <div class="col-9 col-md-9 align-self-center">
              <div class="right-side text-start">
                <h4>{{val.name}}</h4>
                <a href="tel:{{val.phone}}">{{val.phone}}</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul class="profile-links list-unstyled list-inline mb-0 text-center">
        <li class="edit-link list-inline-item">
          <a href="javascript:" @click="addContact()">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactList',
  data(){
    return {
      contactLists: []
    }
  },
  computed: {
    contacts: {
      get(){
        const c = this.$store.state.contacts;
        c.map((e)=>{
          e.name = `${e.firstName} ${e.lastName}`
        })
        return c
      },
      set(val){
        this.contactLists = val
      }
    },


    temp() {
      const c = this.$store.state.contacts;
      c.map((e)=>{
        e.name = `${e.firstName} ${e.lastName}`
      })
      return c
    },

  },
  methods: {
    viewContact(val, index){
      // this.$store.dispatch('selectContact', val);
      this.$store.dispatch('selectedIndex', index);
       this.$store.dispatch('makeSectionVisible',{
        view: false,
        edit: true,
        list: false
      })
    },
     addContact(){
      this.$store.dispatch('selectedIndex', -1);
      this.$store.dispatch('makeSectionVisible',{
        view: false,
        edit: true,
        list: false
      })
    },
    search(event){
      if(event.target.value!=''){
      const dt = this.temp.filter((e)=>e.name?.toLowerCase()==event.target.value.toLowerCase())
      this.contacts = dt
      }else{
        this.contacts = [...this.temp]
      }
    }
  },
  mounted() {
    this.contactLists = this.contacts
    console.log(this.$store)
  }
}
</script>

<style lang="css" scoped>
.profile_pic {
  max-width: 50px;
}
.contactlist {
  height: 80vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
