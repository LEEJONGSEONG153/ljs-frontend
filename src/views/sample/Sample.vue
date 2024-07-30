<template>
    <el-upload
    class="upload-demo"
    multiple
    drag
    action="#"
    :before-upload="beforeAvatarUpload"
    
    >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
        파일을 끌어 놓으세요
        <!-- Drop file here or <em>click to upload</em> -->
        </div>
    </el-upload>
    <div v-for="(item,index) in uploadFiles" :key="index">
        <p>{{item.name}}</p>
    </div>
    <button type="button" class="btn medium filled" v-if="saveBtnFlag"  @click="saveFile">저장</button>
</template>

<script setup>
import { useGet, usePost, useDelete, usePut } from '@/utils/apiUtils';
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import heic2any from'heic2any';
import { ref } from 'vue';

const uploadFiles = ref([]);
const createDates = ref([]);
const saveBtnFlag = ref(false);


/**
 * 업로드 전
 * action 에 적힌 url 타기 전인데 return false로 rawFile 정보 저장
 */
const beforeAvatarUpload = async(rawFile) => {
    saveBtnFlag.value = false;

    console.log('rawFile', rawFile);
        
    let ext = rawFile.name.split('.').pop().toLowerCase();

    //todo 확장자 체크 필요 and 여러개 올리고 싶은것에 대한 경고문 필요
    if(!['jpg', 'jpeg', 'png', 'gif', 'bmp', 'mp4', 'mov','heic'].includes(ext)){
         ElMessage.error(ext+'확장자는 허용 되지 않습니다.')
         return false;
    }
    // uploadFile = rawFile;
    // fileName.value = rawFile.name;
    // fileSize.value = rawFile.size/1000 + 'kb'
    const date = new Date(rawFile.lastModifiedDate);
    
   
    //heic -> jpeg
    if(ext == "heic"){
        rawFile =await getHeicToJpeg(rawFile);
    }

    // 원하는 형식으로 날짜 형식화
    let createDate = date.getFullYear() +
                      ("0" + (date.getMonth() + 1)).slice(-2) +
                      ("0" + date.getDate()).slice(-2);

    
    uploadFiles.value.push(rawFile);
    createDates.value.push(createDate);
    
    
    saveBtnFlag.value = true;
    
    return false;
}


const getHeicToJpeg = async (file)=>{
    const blob = new Blob([file]);
	const JpegBlob = await heic2any({
		blob:blob,
		toType: 'image/jpeg'
	})

	const name = file.name.split('.')[0] + '.jpeg'
	const newFile = new File([JpegBlob],name)

	return newFile
}

const saveFile = async () => {

    console.log(uploadFiles.value);
    console.log(createDates.value);
    let formData = new FormData();

    for(let i=0;i<uploadFiles.value.length; i++) {
        formData.append("uploadFiles",uploadFiles.value[i]);
        formData.append("createDates",createDates.value[i]);
    }
    

    // formData.append("uploadFiles",uploadFiles.value);
    // formData.append("createDates",createDates.value);
    
    let axiosConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }

    const result = await usePost('/api/v1/fileUpload', formData, axiosConfig);

    if(result.status == "200") {
        alert('저장되었습니다.');
    }

    uploadFiles.value = [];
    createDates.value = [];
}
</script>

<style>

</style>