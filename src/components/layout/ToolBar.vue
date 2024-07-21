<template>

    <header>
        <!-- scrpit!! 버튼 클릭 토글, 현재 화면의 sub-category 열림/닫힘 -->
        <button type="button" class="header-btn" @click.stop="emits('handleIsToggle')"><span class="icon menu size30">메뉴</span></button>

        <div class="group">
            <div class="weather-wrap gap-8">
                <div class="region gap-2">
                    <span class="icon map-pin size14">지역</span>
                    <p class="body-md">서울</p>
                </div>

                <div class="weather gap-4">
                    <span class="icon weather-conditions sunny size30"></span>
                    <p class="body-md f-medium">24℃</p>
                </div>

                <div class="option gap-4">
                    <p>습도 35%</p>
                    <p>풍속 2.9m/s</p>
                </div>
            </div>

            <div class="update-wrap">
                <p class="f-medium">update</p>
                <div class="date-wrap gap-4">
                    <p class="date">2024-03-04</p>
                    <p class="time">15:18:00</p>
                </div>
            </div>

            <div class="utility-wrap gap-14">
                <!-- scrpit!! form 클릭하면 active 클래스 추가 , 돋보기 아이콘 누르면 셀렉트 박스 내용대로 검색(페이지 이동)되며 active 클래스 없어짐 -->
                <form action="" class="header-btn search-bar" >
                    <div class="select-wrap">
                        <!-- 해당검색어는 메뉴 페이지 검색입니다. !! -->
                        <el-select-v2 
                            v-model="searchMenu" 
                            :options="searchMenuList"
                            placeholder="검색어를 입력해주세요" 
                            filterable 
                            clearable 
                            :disabled="false"
                        />
                    </div>
                    
                    <button type="button" @click.stop="$emit('handleToggleSearchPopup')"><span class="icon search size30">검색</span></button>
                </form>

                <!-- scrpit!! 알림이 있을때만 active 클래스 추가 -->
                <button type="button" class="header-btn alarm active"><span class="icon bell size30">알림</span></button>
                <button type="button" class="header-btn"><span class="icon full-window size30">전체 화면</span></button>
                <div class="my-info-wrap">
                    <!-- script!! show 버튼 토글 추가 -->
                    <button type="button" class="header-btn my-info" @click.stop="emits('openMyInfoPopup')"><span class="icon user size30">내 정보</span></button>
                    <!-- my-info 클릭 시 나타나는 카드 -->
                    <PopMyInfo v-if="isMyInfoPopup" @logout="logout" />
                    
                </div>
            </div>
        </div>
    </header>

    

    

</template>

<script setup>
import { ref, defineEmits } from "vue";
//import loginApi from "@/apis/loginApi";
import router from "@/router/router";
import store from "@/store/store"
import PopMyInfo from '@/components/layout/PopMyInfo.vue'
// import { ref } from "vue";

const searchMenu = ref("");
const searchMenuList  = ref([
    {label : "메뉴1" , value : "메뉴경로1" },
    {label : "메뉴2" , value : "메뉴경로2" }
]);


const props = defineProps({
  isMyInfoPopup : Boolean
})

const emits = defineEmits(['openMyInfoPopup' , "handleIsToggle", "handleToggleSearchPopup"])


// 로그아웃
const logout= async () => {
    //await loginApi.logout()
    store.dispatch("login/setLogoutData");
    router.push("/login")
}
</script>