<template>
    <q-scroll-area class="fit">
        <q-list padding>
            <q-item  :class="ruta=='/articulos' ? 'text-light-blue-3' : 'text-white'" clickable v-ripple>
                <q-item-section avatar>
                <q-icon name="fas fa-database" />
                </q-item-section>
                <q-item-section>
                    -
                </q-item-section>
            </q-item>
            <q-item :class="ruta=='/articulos/precios' ? 'text-light-blue-3' : 'text-white'" clickable v-ripple to="/articulos/precios">
                <q-item-section avatar>
                <q-icon name="fas fa-money-bill-alt" />
                </q-item-section>
                <q-item-section>
                Precios
                </q-item-section>
            </q-item>
            <q-item :class="ruta=='/articulos/categorias' ? 'text-light-blue-3' : 'text-white'" clickable v-ripple to="/articulos/categoria">
                <q-item-section avatar>
                <q-icon name="fas fa-cubes" />
                </q-item-section>
                <q-item-section>
                Categorias
                </q-item-section>
            </q-item>
            <q-item :class="ruta=='/articulos/proveedores' ? 'text-light-blue-3' : 'text-white'" clickable v-ripple  to="/articulos/proveedores">
                <q-item-section avatar>
                <q-icon name="fas fa-industry" />
                </q-item-section>
                <q-item-section>
                Provedores
                </q-item-section>
            </q-item>
            <q-separator />
        </q-list>
    </q-scroll-area>
</template>
<script>
export default {
    computed:{
        ruta(){
            return this.$route.path
        }
  },
}
</script>