<template>
    <q-layout class="row justify-center items-center bg-grey-3">
        <div class="col-11 col-md-4">
            <div class=" shadow-4 text-center bg-black text-white q-py-sm pacifico nameCompany" style="border-radius: 15px 15px 0px 0px;">Grupo Vizcarra</div>
            <q-form class="shadow-2 bg-grey-2 q-pa-md" style="border-radius: 0px 0px 15px 15px;" @submit="login">
                <q-input class="q-ma-md" filled dense v-model="form.username" label="Ingrese su usuario" required>
                    <template v-slot:prepend>
                        <q-icon name="fas fa-user"/>
                    </template>
                </q-input>
                <q-input class="q-mx-md" filled dense v-model="form.password" :type="isPassword ? 'password' : 'text'" label="Ingrese su contraseña">
                    <template v-slot:append>
                        <q-icon :name="isPassword ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="isPassword = !isPassword" required/>
                    </template>
                </q-input>
                <q-btn flat color="primary" label="He olvidado mi contraseña" @click="recoveryPassword"/>
                <div class="text-center">
                    <q-btn rounded label="Ingresar" type="submit" color="black"/>
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
                    closeBtn: 'x'
                });
            }).onCancel(()=>{

            }).onDismiss(()=>{

            });
        },
        login (){
            let title = 'title';
            let color = 'color';
            let message = 'message';
            this.$q.dialog({
                title: title,
                color: color,
                message: message,
                html: true
            }).onOk( ()=>{

            }).onCancel( ()=>{
                
            }).onDismiss( ()=>{
                
            });
        }
    }
}
</script>
<style lang="stylus">
/* text-shadow: 1px 3px 0px #5b251d, 1px 13px 5px rgb(171,168,168); */
.nameCompany{
    font-size : 2.5em;
    text-shadow: 1px 3px 0px #5b251d;
}
</style>