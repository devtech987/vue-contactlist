import { createStore } from 'vuex'

const store = createStore({
    state: {
        contacts: [{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },{
            firstName: "Jhon",
            lastName: "Doe",
            phone: "+2235465",
            email: "jhon@gmail.com"
          },
        ],
        activeCard: {
            list: true,
            edit: false,
            view: false
        },
        selectedContact: {},
        selectedIndex: -1
    },
    mutations: {
        newContact (state, val) {
            state.contacts.push(val) 
        },
        setupSectionView (state, val) {
            state.activeCard = val
        },
        selectContact (state, val) {
            console.log(val)
            state.selectedContact = val
        },
        selectedIndex (state, index) {
            state.selectedIndex = index
        },
        updateContact (state, payload) {
            state.contacts[state.selectedIndex] = payload
        },
        deleteContact (state) {
            const c = state.contacts.filter((e, index)=> state.selectedIndex!=index)
            console.log(c)
            state.contacts = c
        }
    },
    getters:{
        contactList (state) {
            console.log(state.contacts)
            return state.contacts.map((e)=>{
                console.log(e)
                e.name = `${e.firstName} ${e.lastName}`
            })
          }
    },
    actions:{
        makeSectionVisible(context,paylod){
            context.commit('setupSectionView', paylod)
        },
        selectContact(context,paylod){
            context.commit('selectContact', paylod)
        },
        selectedIndex(context,paylod){
            context.commit('selectedIndex', paylod)
        },
        updateContact(context,paylod){
            context.commit('updateContact', paylod)
        },
        deleteContact(context){
            context.commit('deleteContact')
        }
    }
})
export default store