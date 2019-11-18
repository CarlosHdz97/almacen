<template>
    <q-page class="q-pa-md q-gutter-md bg-grey-4">
        <div class="row justify-center">
            <div class="col-12 col-md-4" v-for=" i in 10" :key="'Sucursal-'+i">
                <q-card class="my-card  q-ma-xs">
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-avatar>
                            <img src="http://tablero.grupovizcarra.net:2222/gvresources/imgproducts/1023">
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>1023</q-item-label>
                            <q-item-label caption>88394</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-chip color="blue-10" text-color="white" icon="star" dense>Juguete</q-chip>
                        </q-item-section>
                    </q-item>
                    <q-card-section class="bg-grey-10 text-white">
                        <div class="text-subtitle2">PISTOLA DE JUGUETE DE AGUA</div>
                    </q-card-section>
                    <q-card-section class="bg-white text-black">
                        <div class="text-subtitle2">OTROS DATOS.....</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="row justify-center">
            <q-pagination v-model="current" color="black" :max="10" :max-pages="6" :boundary-numbers="true"> </q-pagination>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab push color="blue-10" text-color="white" icon="fas fa-plus" round direction="up">
                <q-fab-action color="blue-8" icon="fas fa-file-csv" @click="uploadExcel=!uploadExcel"/>
                <q-fab-action color="blue-6" icon="fab fa-wpforms" to="/articulos/new"/>
            </q-fab>
        </q-page-sticky>
        <q-dialog v-model="uploadExcel" transition-show="scale" transition-hide="scale">
            <q-card class="bg-teal text-white" style="width: 300px">
                <q-uploader
                url="http://localhost:4444/upload"
                label="Agregue un archivo excel"
                accept=".xls, .xlsx, .csv"
                style="max-width: 300px"
            />
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
export default {
    data(){
        return{
            current:1,
            uploadExcel:false,
            filterOptions:{
                category: '',
                provider: '',
                price: '',
                bestSeller: ''
            },
            filterSelected:{
                category: false,
                provider: false,
                price: false,
                bestSeller: false
            },
            options: [
                'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
            ]
        }
    }
}
</script>