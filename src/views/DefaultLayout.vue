<template>
    <div class="page"  @click="closeMyInfoPopup">
        <!--사이드메뉴 -->
        <SideMenu  :isSideMenuToggle="isSideMenuToggle" @handleIsToggle="handleIsToggle" @handleIsToggleMenu="handleIsToggleMenu" :isLock="isLock" @handleIsLock="handleIsLock" @setIsExistSubMenu="setIsExistSubMenu" />
        <div class="container">
            <!--툴바-->
            <ToolBar @openMyInfoPopup="openMyInfoPopup" :isMyInfoPopup="isMyInfoPopup" :isSideMenuToggle="isSideMenuToggle" @handleIsToggle="handleIsToggle" @handleToggleSearchPopup="handleToggleSearchPopup" />

            <!-- 검색 팝업 -->
            <PopSearch v-if="isPopup" @handleToggleSearchPopup="handleToggleSearchPopup"  />

            <!-- 콘텐츠영역 -->
            <section class="page-contents">
                <router-view/>
            </section>
        </div>
    </div>
</template>

<script setup> 

import ToolBar from "@/components/layout/ToolBar.vue";
import SideMenu from "@/components/layout/SideMenu.vue";
import PopSearch from '@/components/layout/PopSearch.vue'
import { onBeforeMount, ref, watch } from "vue";
import store from "@/store/store"

const isMyInfoPopup = ref(false) //내정보 팝업여부
const isSideMenuToggle = ref(false) // 햄버거메뉴 토글 기능
const isLock = ref(false); // 2뎁스 잠금기능
const isExistSubMenu = ref(false) // 서브메뉴 존재여부
const isPopup = ref(false)

onBeforeMount(() => {
    // store.dispatch('commonRefresh/setIsLock', false);  
    isLock.value = store.getters['commonRefresh/getIsLock']
    //반응형 웹일 때
    if(window.innerWidth <= 1280){
        isExistSubMenu.value = true
    }
})


const handleToggleSearchPopup = () => {
    isPopup.value = !isPopup.value
}

/**
 * 서브메뉴 존재여부 세팅
 */
const setIsExistSubMenu = (value) => {
    isExistSubMenu.value = value
}

//사용자 팝업 오픈
const openMyInfoPopup = () => {
    isMyInfoPopup.value = true 
}

//사용자 팝업 닫기
const closeMyInfoPopup = () => {
    if(isMyInfoPopup.value){
        isMyInfoPopup.value = false
    }
}

/* 사이드바 토글 */
const handleIsToggle = (value) => {
    if(value === null || value === undefined){
        // 무조건 닫을떄는 잠금 해제
        if(isSideMenuToggle.value){
            // isLock.value = false;
            store.dispatch('commonRefresh/setIsLock', false);  
        }

        if(isExistSubMenu.value){
            isSideMenuToggle.value = !isSideMenuToggle.value
        }
    }else{
        // 무조건 닫을떄는 잠금 해제
        if(!value){
            // isLock.value = false;
            store.dispatch('commonRefresh/setIsLock', false);  
        }
        isSideMenuToggle.value = value
    }
}

const handleIsToggleMenu = (value) => {
    if(value === null || value === undefined){
        // 무조건 닫을떄는 잠금 해제
        if(isSideMenuToggle.value){
            // isLock.value = false;
            // store.dispatch('commonRefresh/setIsLock', false);  
        }

        if(isExistSubMenu.value ){
            isSideMenuToggle.value = !isSideMenuToggle.value
        }
    }else{
        // 무조건 닫을떄는 잠금 해제
        if(!value){
            // isLock.value = false;
            // store.dispatch('commonRefresh/setIsLock', false);  
        }
        isSideMenuToggle.value = value
    }
}

/** 잠금 해제기능 */
const handleIsLock = () =>{
    // isLock.value = !isLock.value
    store.dispatch('commonRefresh/setIsLock', !isLock.value);  
}

/** 잠금 기능 영속적으로 관리 */
watch(() => store.getters['commonRefresh/getIsLock'], () => {
    isLock.value = store.getters['commonRefresh/getIsLock']
})

</script>

