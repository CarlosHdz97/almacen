<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-white text-black" elevated>
      <q-toolbar>
        <router-view name="icon-nav"/>
        <q-btn dense flat round icon="menu" @click="left = !left" :hidden="ruta!='/articulos'"/>
        <q-btn dense flat round icon="fas fa-arrow-left" @click="$router.go(-1)" :hidden="ruta=='/articulos'"/>
        <q-toolbar-title>
          <q-avatar>
            <q-icon name="fas fa-boxes"/>
          </q-avatar>
          Articulos
        </q-toolbar-title>
        <q-btn round color="white" text-color="primary" icon="fas fa-search" @click="searchDialog = true"/>
        <q-btn dense flat round icon="menu" @click="right = !right"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" :hidden="ruta!='/articulos'" show-if-above :mini="miniStateLeft" @mouseover="miniStateLeft = false" @mouseout="miniStateLeft = true" mini-to-overlay :width="200" :breakpoint="500" bordered elevated>
      <Nav/>      
    </q-drawer>
    <q-drawer v-model="right" side="right" :hidden="ruta!='/articulos'" show-if-above :mini="miniStateRight" @mouseover="miniStateRight = false" @mouseout="miniStateRight = true" mini-to-overlay :width="200" :breakpoint="500" bordered elevated content-class="bg-light-blue-10 text-white">
      <NavArticulos/>      
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog v-model="searchDialog">
      <q-card style="min-width:300px;">
        <q-card-section class="q-gutter-y-sm">
          <q-input filled dense v-model="filterOptions.code" label="Código"/>
          <q-select filled dense multiple v-model="filterOptions.category" :options="options" label="Categoría" />
          <q-select filled dense multiple v-model="filterOptions.provider" :options="options" label="Proveedor" />
          <q-select filled dense multiple v-model="filterOptions.price" :options="options" label="Precio" />
        </q-card-section>
        <q-card-actions align="around">
          <q-btn flat label="Cancelar" v-close-popup color="red"/>
          <q-btn flat label="Buscar" @click="search" color="blue-9"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import Nav from '../components/nav.vue'
import NavArticulos from '../components/navArticulos.vue'
export default {
  components:{
    Nav,
    NavArticulos
  },
  computed:{
    ruta(){
      return this.$route.path
    }
  },
  data () {
    return {
      left: false,
      miniStateLeft: true,
      right: false,
      miniStateRight: true,
      searchDialog: false,
      filterOptions:{
        code: '',
        category: null,
        provider: null,
        price: null,
        bestSeller: null
      },
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    }
  },
  methods:{
    search(){
      alert('hola');
    }
  }
}
</script>