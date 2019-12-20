<template>
    <q-page class="q-pa-md q-gutter-md">
        <div class="row justify-center">
            <div class="col-12 col-md-4" v-for="(provider, key) in providers" :key="'Provider-'+key">
                <q-card class="my-card q-ma-sm">
                    <q-card-section class="bg-black text-white">
                        <div class="text-subtitle text-center">{{provider.name}}</div>
                    </q-card-section>
                    <q-card-section class="bg-white" v-if="provider.description">
                        <div class="text-subtitle text-justify">{{provider.description}}</div>
                    </q-card-section>
                    <q-card-actions align="around" class="bg-blue-10">
                        <q-btn flat icon="fas fa-pencil-alt" v-close-popup color="white" @click="update(key)"/>
                        <q-btn flat icon="fas fa-file-alt" v-close-popup color="white"/>
                        <q-btn flat icon="fas fa-trash-alt" v-close-popup color="white" @click="deleteItem(provider.id)"/>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn round icon="fas fa-plus" v-close-popup color="blue-10" @click="openForm"/>
        </q-page-sticky>
        <q-dialog v-model="formProvider">
            <q-card style="width: 350px">
                <q-card-section class="row items-center">
                    <div class="text-h6 text-weight-bolder text-uppercase">Creación de proveedor</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section>
                    <q-form class="col-12 col-md-6" @submit.prevent="addNew">
                        <q-input outlined v-model="form.name" ref="name" label="Nombre" dense @input="form.name = form.name.toUpperCase()" :rules="[val => val!== null && val!=='' || 'Campo requerido']" :error-message="err_name" :error="!isValidName"/>
                        <q-input outlined v-model="form.description" ref="description" label="Descripción" dense autogrow @input="form.description = form.description.toUpperCase()" :rules="[]"/>
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
        this.getProviders();
    },
    data(){
        return{
            formProvider: false,
            form:{
                id: null,
                name: '',
                description: '',
            },
            err_name: '',
            providers: []
        }
    },
    methods:{
        getProviders(){
            this.$axios.get('/proveedores').then(res =>{
                this.providers = res.data;
            }).catch(err => {
                console.log(err);
            });
        },
        addNew(){
            if(!this.form.id){
                this.$axios.post('proveedores', this.form).then( res =>{
                    if(res.data){
                        this.$q.notify({
                            icon: 'done',
                            color: 'positive',
                            message: 'Se ha registrado al proveedor'
                        });
                        this.clearForm();
                        this.getProviders();
                        this.formProvider = false;
                    }else{
                        this.$q.notify({
                            color: 'negative',
                            message: 'No se ha podido registrar al proveedor'
                        });
                    }
                }).catch( err =>{
                   if(err.response.status == 422){
                       this.$q.notify({
                           color: 'negative',
                           message: 'No se ha podido registrar al proveedor'
                       });
                       let validations = err.response.data;
                       this.err_name = validations.name ? validations.name.join(' ,') : '';
                   }else{
                       console.log(err);
                   }
                });
            }else{
                this.$axios.post('proveedores/'+this.form.id, this.form).then( res => {
                    if(res.data){
                        this.$q.notify({
                            icon: 'done',
                            color: 'positive',
                            message: 'Se han actualizado los datos del proveedor'
                        });
                        this.clearForm();
                        this.getProviders();
                        this.formProvider = false;
                    }else{
                        this.$q.notify({
                            color: 'negative',
                            message: 'No se han podido actualizar los datos del proveedor'
                        });
                    }
                }).catch(err =>{
                    if(err.response.status == 422){
                       this.$q.notify({
                           color: 'negative',
                           message: 'No se han podido actualizar los datos del proveedor'
                       });
                       let validations = err.response.data;
                       this.err_name = validations.name ? validations.name.join(' ,') : '';
                   }else{
                       console.log(err);
                   }
                });
            }
        },
        clearForm(){
            this.form.id = null;
            this.form.name = null;
            this.form.description = null;
            this.$refs.name.resetValidation();
            this.$refs.description.resetValidation();
        },
        update(id){
            this.form.id = this.providers[id].id;
            this.form.name = this.providers[id].name;
            this.form.description = this.providers[id].description;
            this.formProvider = true;
        },
        openForm(){
            this.formProvider = true;
            this.clearForm();
        },
        deleteItem(id){
            this.$q.dialog({
                title: '¿Desea eliminar al proveedor?',
                message: '',
                cancel: true,
                persistent: true,
            }).onOk(()=>{
                this.$axios.delete('/proveedores/'+id).then( res =>{
                    console.log(res.data);
                    this.$q.notify({
                        icon: 'done',
                        color: 'positive',
                        message: 'Se ha eliminado exítosamente el proveedor'
                    });
                    this.providers.splice(0,1);
                    console.log(this.providers);
                }).catch( err =>{
                    console.log(err);
                });
            }).onCancel(()=>{
                this.$q.notify({
                    icon: 'done',
                    color: 'negative',
                    message: 'Se ha cancelado la eliminación'
                });
            });
        }
    },
    computed: {
        isValidName(){
            return this.err_name<=0;
        }
    }
}
</script>