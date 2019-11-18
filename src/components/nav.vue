<template>
    <q-scroll-area class="fit">
        <q-list padding>
            <q-item :class="ruta=='/sucursales' ? 'text-primary' : 'text-black'" clickable v-ripple to='/sucursales'>
                <q-item-section avatar>
                <q-icon name="fas fa-store" />
                </q-item-section>
                <q-item-section>
                Sucursales
                </q-item-section>
            </q-item>
            <q-item :class="ruta=='/personal' ? 'text-primary' : 'text-black'" clickable v-ripple to='/personal'>
                <q-item-section avatar>
                <q-icon name="fas fa-users" />
                </q-item-section>
                <q-item-section>
                Personal
                </q-item-section>
            </q-item>
            <q-item :class="ruta=='/articulos' ? 'text-primary' : 'text-black'" clickable v-ripple to="/articulos">
                <q-item-section avatar>
                <q-icon name="fas fa-boxes" />
                </q-item-section>
                <q-item-section>
                Articulos
                </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple to="/">
                <q-item-section avatar>
                <q-icon name="fas fa-power-off" color="red"/>
                </q-item-section>
                <q-item-section>
                Cerrar sesión
                </q-item-section>
            </q-item>
        </q-list>
    </q-scroll-area>
</template>
<script>
export default {
    computed:{
        ruta(){
            return this.$route.fullPath
        },
        ruta2(){
            return this.ruta=='/'
        }
  },
}
</script>