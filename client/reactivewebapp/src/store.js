import Vue from 'vue'
import Vuex from 'vuex'
import { createSocketioPlugin } from 'vuex-socketio-plugin'
import * as io from 'socket.io-client'

Vue.use(Vuex)
let _client;

export default new Vuex.Store({
  strict: false,
  plugins: [createSocketioPlugin()],
  state: {
    machines : [
      {
        id:1,
        title: 'Flux condenser',
        status: 'operational'
      },
      {
        id:2,
        title: 'Space crafter',
        status: 'operational'
      },
      {
        id:3,
        title: 'Annoying Death star',
        status: 'operational'
      },
      {
        id:4,
        title: 'Super sonic sex machine',
        status: 'operational'
      },
      {
        id:5,
        title: 'Vendo Opel Corsa 2009 62 CV',
        status: 'operational'
      },
      {
        id:6,
        title: 'Alguien acerca al escenario una cerveza bien fria porfavor ? <3',
        status: 'operational'
      }
    ]
  },
  mutations: {
    SOCKET_CONNECT (state, { client }) {
      console.log('connected')
      _client = client;
    },
    SOCKET_statechange (state, payload) {
      var machineId = payload.data[0].id;
      var foundMachine = state.machines.find((elm) => elm.id == machineId);
      var sentState = payload.data[0].newstate;
      foundMachine.status = sentState;
    }
  },
  actions: {
    emitNewState(context, id) {
      _client.emit("statechange", id);
    }
  }
})
