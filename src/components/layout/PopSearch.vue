<template>
    <!-- 모바일 검색 팝업 -->
    <div class="popup layer mo show" id="searchbar-popup">
        <div class="popup-wrap">
            <div class="popup-title flex-cb mb-20">
                <h2 hidden></h2>
                <h4 class="f-bold f-center">검색</h4>

                <button type="button" @click="$emit('handleToggleSearchPopup')">
                    <span class="icon close size30">닫기</span>
                </button>
            </div>

            <div class="popup-content">
                <!-- 이 팝업 안에서는 active 클래스가 계속 유지 됩니다 -->
                <form action="" class="header-btn search-bar active">
                    <div class="select-wrap">
                        <el-select-v2 
                            v-model="userAuth" 
                            :options="options" 
                            placeholder="검색어를 입력해주세요" 
                            filterable 
                            clearable 
                            :disabled="false"/>
                    </div>
                    
                    <button type="button" @click="handleSearch"><span class="icon search size30">검색</span></button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onUnmounted, ref, defineEmits } from "vue";

const options = ref([])

const emits = defineEmits(["handleToggleSearchPopup"])

const handleSearch = () => {
    console.log('검색 기능 준비중입니다.')
}

</script>