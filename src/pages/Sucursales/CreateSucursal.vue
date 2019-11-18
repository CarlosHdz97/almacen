<template>
    <q-page class="row justify-center items-center">
        <q-form class="q-gutter-y-md col-12 col-md-4" @submit.prevent="addNew">
            <p class="text-subtitle2 text-weight-bolder text-uppercase">Creación de sucursales</p>
            <q-input outlined v-model="form.name" label="Nombre" dense required/>
            <q-input outlined v-model="form.address" label="Dirección" dense required/>
            <q-select outlined v-model="form.manager" :options="sucursal_options" label="Tipo" dense required/>
            <div class="text-right">
                <q-btn label="Aceptar" type="submit" color="black"/>
                <q-btn label="Cancelar" type="reset" color="red" flat class="q-ml-sm" />
            </div>
        </q-form>
    </q-page>
</template>
<script>
export default {
    data(){
        return{
            form: {
                name: '',
                address: '',
                manager: ''
            },
            sucursal_options: ['Bodega', 'Sucursal']
        }
    },
    methods:{
        addNew(){
            alert('se agrego una nueva sucursal');
        }
    }
}
</script>