<template>
    <q-page class="q-pa-md q-gutter-md">
        <div class="row justify-center">
        <q-form class="q-gutter-y-md col-12" @submit.prevent="addNew">
            <div class="q-gutter-sm row" v-for="(item, key) in articulos" :key="'articulo'+key">
                <q-input class="col-12 col-md-2" outlined v-model="item.category" label="Categoría" dense required/>
                <q-input class="col-12 col-md-2" outlined v-model="item.codigo" type="number" label="Código" dense required/>
                <q-input class="col-12 col-md-2" outlined v-model="item.name" label="Nombre" dense required/>
                <q-input class="col-12 col-md-3" outlined v-model="item.description" label="Descripción" dense required autogrow/>
                <q-input class="col-12 col-md-2" outlined v-model="item.stock" type="number" label="Stock" dense required/>
                <q-btn color="transparent" text-color="primary" @click="deleteRow(key)" round icon="fas fa-times-circle" size="xs"/>
                <q-input class="col-12 col-md-2" outlined v-model="item.location" label="Localización" dense required/>
                <q-input class="col-12 col-md-2" outlined v-model="item.status_id" label="Status" dense required/>
                <!-- <q-badge color="black" floating>X</q-badge> -->
            </div>
            <div class="text-center"><q-btn round color="primary" icon="fas fa-plus" @click="addNew"/></div>
        </q-form>
        </div>
    </q-page>
</template>
<script>
export default {
    data(){
        return{
            articulos: [{codigo: '', name: '', description: '', stock: '', location: '', category: '', status_id: ''}],
        }
    },
    methods:{
        addNew(){
            this.articulos.push({codigo: '', name: '', description: '', stock: '', location: '', category: '', status_id: ''});
        },
        deleteRow(key){
            this.articulos.splice(key, 1);
        }
    }
}
</script>