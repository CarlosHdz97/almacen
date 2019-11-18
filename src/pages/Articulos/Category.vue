<template>
    <q-page class="q-pa-md q-gutter-md">
        <div class="row justify-center">
            <div class="col-12 col-md-4" v-for="i in 10" :key="'Sucursal-'+i">
                <q-card class="my-card  q-ma-xs">
                    <q-card-section class="bg-red-8 text-white">
                        <div class="text-subtitle text-center">Temporada de navidad</div>
                    </q-card-section>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label class="text-bold">JUGUETE</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-chip color="blue-9" text-color="white" icon="star" dense>500 Articulos</q-chip>
                        </q-item-section>
                    </q-item>
                    <q-card-actions align="around" class="bg-black">
                        <q-btn flat icon="fas fa-pencil-alt" v-close-popup color="white"/>
                        <q-btn flat icon="fas fa-file-alt" v-close-popup color="white"/>
                        <q-btn flat icon="fas fa-download" v-close-popup color="white"/>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn round icon="fas fa-plus" v-close-popup color="blue-10" @click="formCategory = true"/>
        </q-page-sticky>
        <q-dialog v-model="formCategory" persistent>
            <q-card style="width: 500px">
                <q-card-section class="row items-center">
                <div class="text-h6 text-uppercase">Categorías</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section>
                    <q-breadcrumbs gutter="xs">
                        <q-breadcrumbs-el label="Home" />
                        <q-breadcrumbs-el label="Components" />
                        <q-breadcrumbs-el label="Breadcrumbs" />
                    </q-breadcrumbs>
                    <q-list bordered separator>
                        <q-item clickable v-ripple>
                            <q-item-section>Single line item</q-item-section>
                        </q-item>
                    </q-list>
                    <div class="text-center q-mt-sm">
                        <q-btn icon="fas fa-plus" color="black" round @click="formData = true"/>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="formData">
            <q-card style="width: 350px">
                <q-card-section class="row items-center">
                <div class="text-h6 text-uppercase">Creación de categoría</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section>
                    <q-form class="col-12 col-md-6" @submit.prevent="addNew">
                        <q-input outlined v-model="form.name" ref="name" label="Nombre" dense @input="form.name = form.name.toUpperCase()"/>
                        <q-input outlined v-model="form.description" ref="description" label="Descripción" dense @input="form.description = form.description.toUpperCase()"/>

                        <div class="text-right">
                            <q-btn label="Aceptar" type="submit" color="blue-10"/>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
export default {
    created(){
        this.getSiblings();
    },
    data(){
        return{
            formCategory: false,
            formData: false,
            form:{
                name: '',
                description: '',
                root: null,
                level: 0
            },
            CategoryAttributes:{
                isRoot: ''
            },
            siblings: [],
        }
    },
    methods:{
        createCategory(){
            alert('Creando categoria.....');
        },
        addNew(){
            alert('Nuevo');
            this.formData = false;
        },
        getSiblings(){
            this.$axios.post('/categorias/siblings', {"root" : null}).then( res=>{
                console.log(res);
            }).catch( err =>{
                console.log(err);
            });
        }
    }
}
</script>