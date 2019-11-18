<template>
    <q-page class="q-pa-md q-gutter-md">
        <div class="row justify-center">
            <div class="col-12 col-md-4" v-for=" sucursal in sucursales" :key="'Sucursal-'+sucursal">
                <q-card class="my-card  q-ma-xs">
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-avatar :icon="sucursal.type == 'Bodega' ? 'fas fa-industry' : 'fas fa-store'" color="primary" text-color="white" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{sucursal.name}}</q-item-label>
                            <q-item-label caption>{{sucursal.address}}</q-item-label>
                        </q-item-section>
                        <!-- <q-item-section side>
                            <q-icon name="fas fa-dot-circle" :color=" i%3==0 ? 'red' : 'green'" />
                        </q-item-section> -->
                    </q-item>
                    <!-- <q-card-section class="bg-grey-10 text-white">
                        <div class="text-h6">Responsable</div>
                        <div class="text-subtitle2">Carlos Hernández</div>
                    </q-card-section> -->
                </q-card>
            </div>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn push color="blue-10" text-color="white" icon="fas fa-plus" round @click="formSucursal = true"/>
        </q-page-sticky>

        <q-dialog v-model="formSucursal">
            <q-card style="width: 350px">
                <q-card-section class="row items-center">
                <div class="text-h6 text-weight-bolder text-uppercase">Creación de sucursal</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section>
                    <q-form class="col-12 col-md-6" @submit.prevent="addNew">
                        <q-input outlined v-model="form.name" ref="name" label="Nombre" dense :rules="[val => val!== null && val!=='' || 'Campo requerido']" :error-message="err_name" :error="!isValidName" @input="form.name = form.name.toUpperCase()"/>
                        <q-input outlined v-model="form.address" ref="address" label="Dirección" dense :rules="[val => val!== null && val!=='' || 'Campo requerido']" :error-message="err_address" :error="!isValidAddress" @input="form.address = form.address.toUpperCase()"/>
                        <q-select outlined v-model="form.type" ref="type" :options="sucursal_options" label="Tipo" dense :rules="[val => val!== null && val!=='' || 'Selecione un tipo de sucursal']" :error-message="err_type" :error="!isValidType"/>
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
        this.getSucursales();
    },
    data(){
        return{
            form: {
                name: '',
                address: '',
                type: ''
            },
            formSucursal: false,
            sucursal_options: ['Bodega', 'Sucursal'],
            sucursales: null,
            err_name: '',
            err_address: '',
            err_type: ''
        }
    },
    methods:{
        getSucursales(){
            this.$axios.get('/sucursales').then(res =>{
                this.sucursales = res.data;
            });
        },
        addNew(){
            this.$axios.post('/sucursales', this.form ).then(res =>{
                let result = res.data;
                if (result.data){
                    this.$q.notify({
                        icon: 'done',
                        color: 'positive',
                        message: 'Se ha guardado con éxito la sucursal'
                    });
                    this.clearForm();
                }else{
                    this.$q.notify({
                        color: 'negative',
                        message: 'No se ha podido guardar la sucursal'
                    });
                }
            }).catch(err =>{
                if(err.response.status==422){
                    this.$q.notify({
                        color: 'negative',
                        message: 'No se ha podido guardar la sucursal'
                    });
                    let validations = err.response.data;
                    this.err_name = validations.name ? validations.name.join(', ') : '';
                    this.err_address = validations.address ? validations.address.join(', ') : '';
                    this.err_type = validations.type ? validations.type.join(', ') : '';
                }else{
                    console.log(err);
                }
            });
        },
        clearForm(){
            this.form.name = null;
            this.form.address = null;
            this.form.type = null;
            this.$refs.name.resetValidation();
            this.$refs.address.resetValidation();
            this.$refs.type.resetValidation();
            this.err_name = '';
            this.err_address = '';
            this.err_type = '';
        }
    },
    computed: {
        isValidName(){
            return this.err_name.length<=0
        },
        isValidAddress(){
            return this.err_address.length<=0
        },
        isValidType(){
            return this.err_type.length<=0
        }
    }
}
</script>