<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-white text-black" elevated>
      <q-toolbar>
        <router-view name="icon-nav"/>
        <q-btn dense flat round icon="menu" @click="left = !left" :hidden="ruta!='/personal'"/>
        <q-btn dense flat round icon="fas fa-arrow-left" @click="$router.go(-1)" :hidden="ruta=='/personal'"/>
        <q-toolbar-title>
          <q-avatar>
            <q-icon name="fas fa-users"/>
          </q-avatar>
          Personal
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" :hidden="ruta!='/personal'" show-if-above :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true" mini-to-overlay :width="200" :breakpoint="500" bordered>
      <Nav/>      
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import Nav from '../components/nav.vue'
export default {
  components:{
    Nav
  },
  computed:{
    ruta(){
      return this.$route.path
    }
  },
  data () {
    return {
      left: false,
      miniState: true
    }
  },
  methods:{
  }
}
</script>