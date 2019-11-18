<template>
    <q-page class="q-pa-md q-gutter-md">
        <div class="row justify-center">
            <div class="col-12 col-md-2">
                <q-uploader url="http://localhost:4444/upload" label="Agregue un archivo excel" accept=".xls, .xlsx, .csv" style="max-width: 300px" @added="getDocument"/>
            </div>
            <q-form class="q-gutter-y-md col-12" @submit.prevent="addNew">
                <div class="q-gutter-sm row" v-for="(item, key) in productos" :key="'producto'+key">
                    <q-input class="col-12 col-md-2" outlined v-model="item[1]" label="Código" dense required/>
                    <q-input class="col-12 col-md-2" outlined v-model="item[2]" label="Menudeo" dense required/>
                    <q-input class="col-12 col-md-2" outlined v-model="item[3]" label="Nayoreo" dense required/>
                    <q-input class="col-12 col-md-3" outlined v-model="item[4]" label="Media Caja" dense required/>
                    <q-input class="col-12 col-md-2" outlined v-model="item[5]" label="Caja" dense required/>
                    <q-btn color="transparent" text-color="primary" @click="deleteRow(key)" round icon="fas fa-times-circle" size="xs"/>
                </div>
                <!-- <div class="text-center"><q-btn round color="primary" icon="fas fa-plus" @click="addNew"/></div> -->
            </q-form>
        </div>
    </q-page>
</template>
<script>
import Excel from 'exceljs'
export default {
    data(){
        return{
            productos:[]
        }
    },
    methods:{
        getDocument(files){
            console.log(files)
            var workbook = new Excel.Workbook();
            var reader = new FileReader();
            var rowsFS = [];
            reader.readAsArrayBuffer(files[0]);
            reader.onload = () => {
                var buffer = reader.result;
                console.log('Archivo cargado!!')
                workbook.xlsx.load(buffer).then(workbook => {
                    var worksheet = workbook.getWorksheet(1);
                    worksheet.eachRow((row, rowNumber)=>{ 
                        if(rowNumber!=1){
                            this.productos.push(row.values)
                            console.log(row.values) 
                        }
                    });
                });
            };
        },
        addNew(){
            console.log('new');
        },
        deleteRow(key){
            this.productos.splice(key, 1);
        }
    }
}
</script>