<template>
    <q-page class="row justify-center items-center">
        <q-stepper v-model="step" ref="stepper" class="col-12 col-md-7" active-color="deep-orange" done-color="secondary" animated :contracted="$q.screen.lt.md">
            <q-step :name="1" title="Datos personales" icon="fas fa-users" :done="step > 1">
                <q-form @submit.prevent="addNew">
                    <div class="text-subtitle1 text-weight-bolder text-uppercase col-12">Datos de usuario</div>
                    <div class="text-subtitle2 col-12 text-blue-10">**Datos necesarios</div>
                    <div class="row justify-end">
                        <q-select class="col-12 col-md-6" outlined v-model="form.sucursal_id" :options="sucursales" label="Sucursal" dense emit-value map-options :rules="[val => val!== null && val!=='' || 'Campo requerido']" :error-message="err_sucursal_id" :error="!isValidSucursal_id"/>
                    </div>
                    <div class="row justify-center q-gutter-x-md">
                        <q-input class="col-12 col-md" outlined v-model="form.name" label="Nombre" dense :rules="[val => val!== null && val!=='' || 'Campo requerido']" :error-message="err_name" :error="!isValidName" @input="form.name = form.name.toUpperCase()"/>
                        <q-input class="col-12 col-md" outlined v-model="form.lastname" label="Apellidos" dense :rules="[val => val!== null && val!=='' || 'Campo requerido']" :error-message="err_lastname" :error="!isValidLastname" @input="form.lastname = form.lastname.toUpperCase()"/>
                    </div>
                    <div class="row justify-center q-gutter-x-md">
                        <q-input class="col-12 col-md" outlined v-model="form.nickname" label="Nickname" dense :rules="[val => val!== null && val!=='' || 'Campo requerido']" :error-message="err_nickname" :error="!isValidNickname" @input="form.nickname = form.nickname.toUpperCase()"/>
                        <q-input class="col-12 col-md" outlined v-model="form.password" label="Contraseña (no requerido)" dense type="password" :rules="[]"/>|
                    </div>
                     <p class="text-subtitle2 text-weight-bolder text-uppercase col-12">Datos personales</p>
                     <div class="row justify-center q-gutter-md q-mb-md">
                         <!-- <q-uploader url="http://192.168.1.74/api_base/public/uploads/photo"  color="blue-10" label="Fotografía" flat bordered class="col-12 col-md" field-name="photo"/> -->
                          <q-input class="col-12 col-md q-pa-none" outlined v-model="form.birthday" label="Fecha de cumpleaños" dense mask="date" :rules="['form.birthday']">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form.birthday" @input="() => $refs.qDateProxy.hide()" :title="form.name+' '+form.lastname" subtitle="Fecha de cumpleaños"/>
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                        <q-select class="col-12 col-md-3" outlined v-model="form.gender" :options="gender_options" label="Sexo" dense/>
                    </div>
                    <div class="row justify-center q-gutter-md q-mb-md">
                        <q-input class="col-12 col-md" outlined v-model="form.pants" label="Talla de pantalón" dense/>
                        <q-input class="col-12 col-md" outlined v-model="form.shoes" label="Número de calzado" dense/>
                        <q-input class="col-12 col-md" outlined v-model="form.tshirt" label="Talla de camisa / blusa" dense/>
                    </div>
                    <div class="col-12 text-right">
                        <q-btn type="submit" color="blue-10" label="Siguiente"/>
                    </div>
                </q-form>
            </q-step>
            <q-step :name="2" title="Permisos" icon="fas fa-users-cog" :done="step > 2">
                <q-form class="q-gutter-y-md" @submit.prevent="addNew">
                    <p class="text-subtitle2 text-weight-bolder text-uppercase">Asignación de permisos</p>
                    <q-select outlined v-model="form.rol_id" :options="roles" label="Rol" dense emit-value map-options @input="getDefaultPermisos" :rules="[val => val!== null && val!=='' || 'Campo requerido']" :error-message="err_rol_id" :error="!isValidRol_id"/>
                    <div class="q-pa-md row">
                        <q-tree class="col-12 col-sm-5" :nodes="permisos" node-key="id" tick-strategy="leaf" :ticked.sync="form.permisos" :expanded.sync="expanded" default-expand-all/>
                    </div>
                    <div class="col-12 text-right">
                        <q-btn flat color="blue-10" label="Volver" class="q-ml-sm" @click="$refs.stepper.previous()"/>
                        <q-btn type="submit" color="blue-10" label="Crear usuario"/>
                    </div>
                </q-form>
            </q-step>
            <q-step :name="3" title="Verificar datos" icon="fas fa-tasks">
                <div v-if="save.account">
                    <p class="text-subtitle2 text-weight-bolder text-uppercase">Se ha guardado el usuario correctamente</p>
                    <p class="text-uppercase"><span class="text-weight-bolder">Nombre: </span>{{save.account.name}}</p>
                    <p class="text-uppercase"><span class="text-weight-bolder">Usuario: </span>{{save.account.nickname}}</p>
                    <p class="text-uppercase"><span class="text-weight-bolder">sucursal: </span>{{save.account.sucursal_id}}</p>
                    <p class="text-uppercase"><span class="text-weight-bolder">Camisa / Blusa: </span>{{save.account.tshirt}}</p>
                    <p class="text-uppercase"><span class="text-weight-bolder">Pantalón: </span>{{save.account.pants}}</p>
                    <p class="text-uppercase"><span class="text-weight-bolder">Shoes: </span>{{save.account.shoes}}</p>
                    <p class="text-uppercase"><span class="text-weight-bolder">Rol: </span>{{save.account.rol_id}}</p>
                    <q-tree class="col-12 col-sm-5" :nodes="permisos" node-key="id" tick-strategy="leaf" :ticked.sync="save.permisos" :expanded.sync="expanded" default-expand-all disabled/>
                </div>
                <div class="col-12 text-right">
                    <q-btn flat color="blue-10" label="Crear nuevo" class="q-ml-sm" @click="addOther"/>
                    <q-btn type="submit" color="blue-10" label="Aceptar" @click="$router.go(-1)"/>
                </div>
            </q-step>
        </q-stepper>
    </q-page>
</template>
<script>
export default {
    created(){
        this.getSucursales();
        this.getRoles();
        this.getPermisos();
    },
    data(){
        return{
            step: 1,
            form: {
                name: '',
                lastname: '',
                nickname: '',
                rol_id: '',
                sucursal_id: '',
                birthday: '',
                gender: '',
                shoes: '',
                tshirt: '',
                pants: '',
                permisos: [],
                photography: ''
            },
            save: {
                permisos: null,
                account: null
            },
            sucursales: [],
            roles: [],
            permisos: [],
            expanded: [],
            gender_options: ['Hombre', 'Mujer'],
            err_name: '',
            err_lastname: '',
            err_nickname: '',
            err_rol_id: '',
            err_sucursal_id: '',
            err_status_id: ''
        }
    },
    methods:{
        getSucursales(){
            this.$axios.get('/sucursales').then(res=>{
                let sucursales = res.data.map(item =>{
                    return {'label' : item.name,  'value' : item.id}
                });
                this.sucursales = sucursales;
            });
        },
        getRoles(){
            this.$axios.get('/roles').then(res=>{
                let roles = res.data.map(item =>{
                    return {'label' : item.name,  'value' : item.id}
                });
                this.roles = roles;
            });
        },
        getPermisos(){
            this.$axios.get('permisos').then(res=>{
                let a = Object.values(res.data);
                let permisos = a.map(item =>{
                    let hijos = Object.values(item.children);
                    item.children = this.customChildren(hijos);
                    return { 'id' : item.id,'label' : item.name, 'children' : item.children}
                });
                this.permisos = permisos;
            })
        },
        customChildren(child){
            return child.map( item=>{
                let hijos = Object.values(item.children);
                item.children = this.customChildren(hijos);
                return { 'id' : item.id,'label' : item.name, 'children' : item.children}
            });
        },
        getDefaultPermisos(value){
            this.$axios('/roles/'+value+'/permisos').then( res=>{
                this.form.permisos = res.data;
            });
        },
        addNew(){
            if(this.step==1){
                this.step+=1;
            }else if(this.step==2){
                this.$axios.post('accounts', this.form).then( res=>{
                    let result = res.data;
                    if(result.account.id){
                        this.$q.notify({
                            icon: 'done',
                            color: 'positive',
                            message: 'Se ha registrado un nuevo usuario'
                        });
                        this.save.permisos = result.permisos.attached;
                        this.save.account = result.account;
                        this.clearForm();
                        this.step+=1;
                    }else{
                        this.$q.notify({
                            color: 'negative',
                            message: 'No se ha podido registrar al usuario'
                        });
                    }
                }).catch(err =>{
                    if(err.response.status==422){
                        this.$q.notify({
                            color: 'negative',
                            message: 'No se ha podido guardar la cuenta'
                        });
                        let validations = err.response.data;
                        this.err_name = validations.name ? validations.name.join(', ') : '';
                        this.err_lastname = validations.lastname ? validations.lastname.join(', ') : '';
                        this.err_nickname = validations.nickname ? validations.nickname.join(', ') : '';
                        this.err_rol_id = validations.rol_id ? validations.rol_id.join(', ') : '';
                        this.err_sucursal_id = validations.sucursal_id ? validations.sucursal_id.join(', ') : '';
                        this.err_status_id = validations.status_id ? validations.status_id.join(', ') : '';
                    }else{
                        console.log(err);
                    }
                });
            }
        },
        addOther(){
            this.clearForm();
            this.step = 1;
        },
        clearForm(){
            this.form.sucursal_id = null;
            this.form.rol_id = null;
            this.form.name = null;
            this.form.lastname = null;
            this.form.nickname = null;
            this.form.password = null;
            this.form.birthday = null;
            this.form.gender = null;
            this.form.pants = null;
            this.form.shoes = null;
            this.form.tshirt = null;
            this.$refs.sucursal_id.resetValidation();
            this.$refs.name.resetValidation();
            this.$refs.lastname.resetValidation();
            this.$refs.nickname.resetValidation();
            this.$refs.status_id.resetValidation();
            this.$refs.rol_id.resetValidation();
        }
    },
    computed: {
        isValidSucursal_id(){
            return this.err_sucursal_id.length<=0;
        },
        isValidName(){
            return this.err_name.length<=0;
        },
        isValidLastname(){
            return this.err_lastname.length<=0;
        },
        isValidNickname(){
            return this.err_nickname.length<=0;
        },
        isValidStatus_id(){
            return this.err_status_id.length<=0;
        },
        isValidRol_id(){
            return this.err_rol_id.length<=0;
        },
    }
}
</script>
