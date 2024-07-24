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
import { useGet, useFetch, useDelete, usePut } from '@/utils/apiUtils';
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
/**
 * 업로드 전
 * action 에 적힌 url 타기 전인데 return false로 rawFile 정보 저장
 */
const beforeAvatarUpload = async(rawFile) => {
    
    let ext = rawFile.name.split('.').pop().toLowerCase();


    alert(ext);

    //todo 확장자 체크 필요 and 여러개 올리고 싶은것에 대한 경고문 필요
    if(!['jpg', 'jpeg', 'png', 'gif', 'bmp', 'mp4', 'mov'].includes(ext)){
         ElMessage.error(ext+'확장자는 허용 되지 않습니다.')
         return false;
    }
    // uploadFile = rawFile;
    // fileName.value = rawFile.name;
    // fileSize.value = rawFile.size/1000 + 'kb'

    const date = new Date(rawFile.lastModifiedDate);

    // 원하는 형식으로 날짜 형식화
    let createDate = date.getFullYear() +
                      ("0" + (date.getMonth() + 1)).slice(-2) +
                      ("0" + date.getDate()).slice(-2);

    let formData = new FormData();
    formData.append("uploadFile",rawFile);
    formData.append("createDate",createDate);
    
    let axiosConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
    
    await useFetch('/api/v1/fileUpload', formData, axiosConfig)
    
    return false;
}
</script>

<style>

</style>