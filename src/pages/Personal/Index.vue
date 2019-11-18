<template>
    <q-page class="q-pa-md q-gutter-md">
        <div class="row justify-center">
            <div class="col-12 col-md-4" v-for=" (user, key) in personal" :key="'user-'+key">
                <q-card class="my-card q-ma-xs" @click="selectAccount(key)" style="cursor:pointer;">
                    <q-card-section class="text-center">
                        <q-avatar size="80px" font-size="50px" color="cyan-9" text-color="white" icon="fas fa-user" />
                        <!-- <img src="~assets/CarlosHdz.jpg" style="height: 90px; max-width: 100px; border-radius:50%; border:2px solid blue;"> -->
                        <br><span class="text-subtitle1">{{user.name + ' ' + user.lastname}}</span>
                        <br><span class="text-subtitle2">{{user.rol.name}}</span>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <q-dialog v-model="showAccount">
            <q-card v-if="showAccount">
                <q-card-section>
                    <div class="row items-center no-wrap">
                        <div class="col">
                            <div class="text-h6">{{account.name + ' ' + account.lastname}}</div>
                            <div class="text-subtitle2">{{account.rol.name}}</div>
                        </div>
                        <div class="col-auto">
                            <q-btn color="grey-7" round flat icon="more_vert">
                                <q-menu cover auto-close>
                                    <q-list>
                                        <q-item clickable>
                                            <q-item-section>Editar cuenta</q-item-section>
                                        </q-item>
                                        <q-item clickable>
                                            <q-item-section>Eliminar cuenta</q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-btn>
                        </div>
                    </div>
                </q-card-section>
                <q-separator/>
                <q-card-section>
                    <q-list>
                        <q-item>
                            <q-item-section avatar> <q-icon color="primary" name="fas fa-user-secret"/></q-item-section>
                            <q-item-section>{{account.nickname}}</q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section avatar> <q-icon color="primary" name="fas fa-store-alt"/></q-item-section>
                            <q-item-section>{{account.sucursal.name}}</q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section avatar> <q-icon color="primary" name="fas fa-birthday-cake"/></q-item-section>
                            <q-item-section>{{account.birthday ? customFormatDate(account.birthday) : '-'}}</q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section avatar> <q-icon color="primary" name="fas fa-mars"/></q-item-section>
                            <q-item-section>{{account.gender}}</q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
                <q-separator/>
                <q-card-actions align="around">
                    <q-item>
                        <q-item-section avatar> <q-icon color="primary" name="fas fa-tshirt"/></q-item-section>
                        <q-item-section>{{account.tshirt ?  account.tshirt : '-'}}</q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar> <q-icon color="primary" name="fas fa-grip-lines-vertical"/></q-item-section>
                        <q-item-section>{{account.pants ? account.pants : '-'}}</q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar> <q-icon color="primary" name="fas fa-shoe-prints"/></q-item-section>
                        <q-item-section>{{account.shoes ? account.shoes: '-'}}</q-item-section>
                    </q-item>
                </q-card-actions>
                <q-card-section>
                    <p class="text-h6 text-weight-bold">Permisos en el sistema.</p>
                    <p class="text-subtitle2 text-blue9">Permisos en el sistema.</p>
                    <div class="q-gutter-sm">
                        <q-checkbox dense v-model="cbox" label="Teal" color="teal" />
                        <q-checkbox dense v-model="cbox" label="Orange" color="orange" />
                        <q-checkbox dense v-model="cbox" label="Red" color="red" />
                        <q-checkbox dense v-model="cbox" label="Cyan" color="cyan" />
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn push color="black" text-color="white" icon="fas fa-plus" round to="/personal/new"/>
        </q-page-sticky>
    </q-page>
</template>
<script>
export default {
    created(){
        this.getPersonal();
    },
    data(){
        return{
            showAccount: false,
            personal: [],
            account: [],
            cbox: false
        }
    },
    methods:{
        getPersonal(){
            console.log('-------');
            this.$axios.get('accounts').then(res => {
                this.personal = res.data;
            }).catch( err => {
                console.log(err);
            });
        },
        selectAccount(key){
            this.showAccount = true;
            this.account = this.personal[key];
        },
        customFormatDate(date){
            return date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
        }
    }
}
</script>