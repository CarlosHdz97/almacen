<template>
    <q-layout class="row justify-center items-center" style="height:100vh;">
        <div class="col-12 col-md-4">
            <!-- <q-form class="bg-dark-bluee q-pa-md" style="border-radius: 15px;"> -->
                <q-form>
                <q-input class="q-ma-md" filled dense v-model="form.username" label="Ingrese su usuario">
                    <template v-slot:prepend>
                        <q-icon name="fas fa-user"/>
                    </template>
                </q-input>
                <q-input class="q-mx-md" filled dense v-model="form.password" :type="isPassword ? 'password' : 'text'" label="Ingrese su contraseña">
                    <template v-slot:append>
                        <q-icon :name="isPassword ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="isPassword = !isPassword"/>
                    </template>
                </q-input>
                <q-btn flat color="primary" label="He olvidado mi contraseña" @click="recoveryPassword"/>
                <div class="text-center">
                    <q-btn rounded label="Ingresar" type="submit" color="black" to="/sucursales"/>
                </div>
            </q-form>
        </div>
    </q-layout>
</template>
<script>
export default {
    data(){
        return{
            form: {
                username: '',
                password: '',
            },
            isPassword: true
        }
    },
    methods: {
        recoveryPassword (){
            this.$q.dialog({
                dark: true,
                title: 'Recuperación de contraseña',
                message: 'Ingrese su usuario',
                prompt:{
                    model: '',
                    type: 'text',
                    required: true
                },
                cancel: true,
                persistent: true,
            }).onOk(data =>{
                this.$q.notify({
                    color: 'blue-9',
                    textColor: 'white',
                    message: 'Se notificara al administrador!',
                    position: 'top',
                    closeBtn: 'X'
                });
            }).onCancel(()=>{

            }).onDismiss(()=>{

            });
        }
    }
}
</script>
<style lang="stylus" scoped>
.bg-dark-blue{
    background : #2A323C;
}
.bg-dark-bluee{
    background : #323C48;
}
</style>