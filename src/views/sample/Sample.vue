<template>
        <el-upload
        class="upload-demo"
        drag
        action="#"
        mutiple
        :before-upload="beforeAvatarUpload"
        
        >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
        파일을 끌어 놓으세요
        <!-- Drop file here or <em>click to upload</em> -->
        </div>
    </el-upload>
</template>

<script setup>
import { useFetch } from '@/utils/apiUtils';
/**
 * 업로드 전
 * action 에 적힌 url 타기 전인데 return false로 rawFile 정보 저장
 */
const beforeAvatarUpload = async(rawFile) => {
    
    //let ext = rawFile.name.split('.').pop().toLowerCase();
    
    

    let formData = new FormData();
    formData.append("uploadFile",rawFile);
    let axiosConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
        }

    }
    
    await useFetch('/api/v1/fileUpload', formData, axiosConfig)

    //todo 확장자 체크 필요 and 여러개 올리고 싶은것에 대한 경고문 필요
    // if(!['jpg', 'jpeg', 'png', 'gif', 'pdf'].includes(ext)){
    //      ElMessage.error('Avatar picture must be JPG format!')
    //      return false;
    // }
    // uploadFile = rawFile;
    // fileName.value = rawFile.name;
    // fileSize.value = rawFile.size/1000 + 'kb'

    //return false;
    console.log('33');
    
    return false;
}
</script>

<style>

</style>