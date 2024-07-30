<template>

    <Viewer :images="images"
            @inited="inited"
            class="viewer"
            ref="viewer"
            :options="options"
        
            >
        <template #default="scope">
            <img v-for="image in scope.images" :src="image.src" :data-src="image.src" :key="image.src" :alt="image.title" :style="imgSize" >
            
        </template>
    </Viewer>        

</template>

<script setup>
import { useGet, usePost, useDelete, usePut } from '@/utils/apiUtils';
import { onMounted, ref } from 'vue';
 import 'viewerjs/dist/viewer.css'
import { component as Viewer, api as viewerApi } from 'v-viewer'

const files = ref(null);
const images = ref([]);
const imgSize = ref(null);
const viewer2 = ref(null);


const inited = (viewer) => {
    viewer2.value = viewer
}

const options = ref({
            ready: () => {
          
            },
            inline: false,
            button:true,
            movable: false,
            title: true,
            navbar: true,
            zoomable: false,
            slideOnTouch: true,
            toolbar: false,
        })


onMounted( async()=>{
    const result = await usePost('/api/v1/file/getList',{galleryType :"image"});    
    files.value = result;

    for(let i=0; i<files.value.length; i++) {
        images.value.push({
            src : "http://58.148.100.28"+files.value[i].filePath+'/'+files.value[i].fileNm,
            title : '인생'+ files.value[i].ljsDays + '일차'
        })
    }
    //viewer 사이즈 조정
    imgSize.value = "height: auto; width:"+window.innerWidth+"px";
})
</script>

<style>
/* img {
    width: 330px;
    height: 330px;
    object-fit: cover;
} */
.viewer-title {

    font-size: 24px;
  
}

</style>