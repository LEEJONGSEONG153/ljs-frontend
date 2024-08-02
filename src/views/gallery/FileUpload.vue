<template>
    <div :class="{'background' : isSpinner }">
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
        <button type="button" class="btn medium filled" v-if="saveBtnFlag" @click="saveFile">업로드</button>
    </div>
    <div>
        <div :class="{'spinner' : isSpinner }"></div>
        <!-- <easy-spinner :type="'circular'" :size="100" :class="spinner"/> -->
    </div>

</template>

<script setup>
import { useGet, usePost, useDelete, usePut } from '@/utils/apiUtils';
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import heic2any from'heic2any';
import { ref } from 'vue';
import {useStore} from "vuex";
import alertMsg from "@/utils/toastUtils";

const store = useStore();
const uploadFiles = ref([]);
const createDates = ref([]);
const isSpinner = ref(false);
const saveBtnFlag = ref(true);

let count = 0;
let countStandard = store.getters['upload/getCountStandard'];
let interval = [];

const gogogo = async(id,rawFile) => {

    if(id < store.getters['upload/getCountStandard']){
        rawFile =await getHeicToJpeg(rawFile);
        console.log('완료됀 된 카운트 >>>',id);  

        if(id == store.getters['upload/getCountStandard']-1 || id == count) {
            store.dispatch('upload/setCountStandard', 3);
            if(count+3<store.getters['upload/getCountStandard']) {
                isSpinner.value = false;
                saveBtnFlag.value =  true; 
            }
        }
        return true;
    } else {

        setTimeout(()=>{
            console.log('5초마다 재시도중 >>>',id);
            gogogo(id,rawFile);

        },5000)

    }
}
/**
 * 업로드 전
 * action 에 적힌 url 타기 전인데 return false로 rawFile 정보 저장
 */
const beforeAvatarUpload = async(rawFile) => {

    isSpinner.value = true;
    saveBtnFlag.value =  false; 

    count++;    
    
    let id = count;



    //console.log('rawFile', rawFile);
        
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

       const pass =  gogogo(id,rawFile);
       if(!pass){
        return;
       }
    }

    // 원하는 형식으로 날짜 형식화
    let createDate = date.getFullYear() +
                      ("0" + (date.getMonth() + 1)).slice(-2) +
                      ("0" + date.getDate()).slice(-2);

    uploadFiles.value.push(rawFile);
    createDates.value.push(createDate);
     
    
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


    store.dispatch("confirm/open", {
        title: "파일 업로드",
        message: "파일을 업로드 하시겠습니까?",
        callback: async () => {
            await store.dispatch("confirm/close")

            isSpinner.value = true;

            let formData = new FormData();

            for(let i=0;i<uploadFiles.value.length; i++) {
                formData.append("uploadFiles",uploadFiles.value[i]);
                formData.append("createDates",createDates.value[i]);
            }
            
            let axiosConfig = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }

            const result = await usePost('/api/v1/fileUpload', formData, axiosConfig);
            
            alertMsg("업로드 완료되었습니다.", "", "success");

            uploadFiles.value = [];
            createDates.value = [];
            saveBtnFlag.value = false;
            isSpinner.value = false;
        }
    })
}
</script>

<style>
.background {
    display: none;
    opacity: 0.1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 1000;
    justify-content: center;
    align-items: center;
    margin: -30px 0 0 -30px;
}
.spinner {
    position: absolute;
    top: 50%;
    left: 40%;
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spinner 2s linear infinite;
}
@keyframes spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>