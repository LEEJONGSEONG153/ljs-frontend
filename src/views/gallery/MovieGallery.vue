<template>
    <template v-for="(item, i) in files" :key="i" >
        <div>
            <video height="350" width="350" controls>
                <source :src="'http://58.148.100.28'+item.filePath+'/'+item.fileNm" :type="item.fileType">
                이 문장은 여러분의 브라우저가 video 태그를 지원하지 않을 때 화면에 표시됩니다!
            </video>
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
    const result = await usePost('/api/v1/file/getList',{galleryType :"movie"});    
    files.value = result;
})

</script>

<style>

</style>