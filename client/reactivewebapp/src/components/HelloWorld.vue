<template>
<div id="wrapper">
  <div v-on:click="changeRandomState(machine.id)" v-for="machine in availableMachines" v-bind:key="machine.title"
   v-bind:class="{'box3' : machine.status == 'operational',
   'box1' : machine.status == 'error',
    'box2': machine.status == 'maintenance'}" class="box shadow3">
    <h1>{{ machine.title }}</h1>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    availableMachines (){
      return this.$store.state.machines;
    }
  },
  methods: {
    changeRandomState: function (id) {
      var randomNumber = Math.floor((Math.random() * 100) + 1);
      var newstate = "operational";
      if(randomNumber > 30 && randomNumber < 70)
        newstate = "maintenance";
       else if(randomNumber >= 70)
        newstate = "error";
        else if(randomNumber <= 30)
        newstate = "operational";

        this.$store.dispatch('emitNewState', {id, newstate});
    }
  }
}
</script>

<style>
#wrapper {
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left:150px;
}
</style>