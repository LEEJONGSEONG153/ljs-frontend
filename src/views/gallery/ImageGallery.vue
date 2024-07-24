<template>
    <template v-for="(item, i) in files" :key="i" >
        <div>

            <img :src="'http://58.148.100.28'+item.filePath+'/'+item.fileNm">
        </div>
        <br>
        <br>
    </template>
</template>

<script setup>
import { useGet, usePost, useDelete, usePut } from '@/utils/apiUtils';
import { onMounted, ref } from 'vue';

const files = ref(null);

onMounted( async()=>{
    const result = await usePost('/api/v1/file/getList',{galleryType :"image"});    
    files.value = result;
})

</script>

<style>
img {
    width: 330px;
    height: 330px;
    object-fit: cover;
}
</style>