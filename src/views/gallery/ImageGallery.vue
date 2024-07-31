<template>

    <div class="slider-demo-block">
        <span class="demonstration">준수(1일~400일)</span>
        <el-slider v-model="sliderValue" @change="dayChange" range show-stops :min="1" :max="400" />
    </div>

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
const start = ref(0);
const end = ref(150);
const sliderValue = ref([0,150]);

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
    const result = await usePost('/api/v1/file/getList',{galleryType :"image", start:start.value, end:end.value});    
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

const dayChange = async() => {

    images.value = [];

    const result = await usePost('/api/v1/file/getList',{galleryType :"image", start:sliderValue.value[0], end:sliderValue.value[1]});  
    console.log(result)  
    files.value = result;

    for(let i=0; i<files.value.length; i++) {
        images.value.push({
            src : "http://58.148.100.28"+files.value[i].filePath+'/'+files.value[i].fileNm,
            title : '인생'+ files.value[i].ljsDays + '일차'
        })
    }
    //viewer 사이즈 조정
    imgSize.value = "height: auto; width:"+window.innerWidth+"px";

}
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

.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 0px;
}
.slider-demo-block .demonstration {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}

</style>