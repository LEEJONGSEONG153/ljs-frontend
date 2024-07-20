<template>

        <!-- 메뉴 PC -->
        <nav class="pc" >
            <div class="main-category">
                <h1>
                    <router-link to="/">CRK</router-link>
                </h1>

                <!-- PC 버전 1뎁스메뉴 -->
                <ul>
                    <li v-for="(item, index) in mainMenuList" :key="index" :class="selectedMainMenu === item.menuCd && 'active'" @click="handleActiveMainMenu(item.menuCd)" >
                        
                        <router-link to="">
                            <span class="icon" :class="item.icon" >{{item.menuCd }} {{ item.menuNm }}</span>
                            {{ item.menuNm}}
                        </router-link>
                    </li>
                </ul>
                <!-- PC 버전 1뎁스메뉴 -->
            </div>

            <!-- scrpit!! 잠금 버튼 누르면 sub-category에 fixed 클래스 토글,
            main-category의 각 li에 hover하면 해당 sub-category 나타남 -->
            <div class="sub-category" :class="{'fixed' : isSideMenuToggle }">

                <div v-for="(depth2, i) in subMenuList" :key="i" class="depth-wrap">
                    <p class="group-title">{{ depth2.menuNm }}</p>
                    <ul>
                        <li v-for="(depth3, j) in depth2[depth2.menuCd]" :key="j" @click="handleActiveSubMenu(depth3)" :class="currentMenu === depth3.siteUrl && 'active'">
                            <router-link :to="depth3.siteUrl">{{ depth3.menuNm}}</router-link>
                        </li>
                    </ul>
                </div>
                <button type="button"  @click="emits('handleIsLock')" class="btn circle small transparent "><span class="icon" :class="isLock ? 'lock' : 'unlock'">잠금</span></button>
            </div>
        </nav>


        <!-- 메뉴 Tablet -->
        <!-- script!!! 반응형 1280이하일 경우 사용. 햄버거 버튼 클릭 시 show 클래스 추가 -->
        <nav class="tablet " :class="{'show' : isSideMenuToggle }" @click="emits('handleIsToggle', false)">
            <div class="dimmed"></div>

            <div class="nav-wrap" @click.stop>
                <div class="group">
                    <div class="flex-cb mb-14">
                        <h1>
                            <a href="./index.html">CRK</a>
                        </h1>
                        
                        <!-- script!!! 닫기 버튼 클릭 시 show 클래스 삭제-->
                        <button type="button">
                            <span class="icon close size30" @click="emits('handleIsToggle', false)">닫기</span>
                        </button>
                    </div>
                    
                    <div class="weather-wrap gap-8 mb-10">
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
                </div>
                
                <div class="nav-menu">
                    <div class="main-category">
                        <ul>
                            <li v-for="(item, index) in mainMenuList" :key="index" :class="selectedMainMenu === item.menuCd && 'active'" @click="handleActiveMainMenu(item.menuCd)" >
                                
                                <router-link to="">
                                    <span class="icon" :class="item.icon" >{{item.menuCd }} {{ item.menuNm }}</span>
                                    {{ item.menuNm}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
        
                    <!-- sub-category 없으면 그냥 빈 영역 -->
                    <div class="sub-category" :class="{'fixed' : isSideMenuToggle }">

                        <div v-for="(depth2, i) in subMenuList" :key="i" class="depth-wrap">
                            <p class="group-title">{{ depth2.menuNm }}</p>
                            <ul>
                                <li v-for="(depth3, j) in depth2[depth2.menuCd]" :key="j" @click="handleActiveSubMenu(depth3)" :class="currentMenu === depth3.siteUrl && 'active'">
                                    <router-link :to="depth3.siteUrl">{{ depth3.menuNm}}</router-link>
                                </li>
                            </ul>
                        </div>
                        <button type="button"  @click="emits('handleIsLock')" class="btn circle small transparent "><span class="icon" :class="isLock ? 'lock' : 'unlock'">잠금</span></button>
                    </div>
                </div>
            </div>
            <!-- nav-wrap 끝 -->
        </nav>
</template>

<script setup>
import {onBeforeMount, onMounted, onUnmounted, onUpdated, ref, watch} from "vue";
import { useStore } from "vuex";
import router from "@/router/router";
const store = useStore();

const props = defineProps({
  isSideMenuToggle : Boolean,
  isLock : Boolean
})
const emits = defineEmits([ "handleIsToggle", "handleIsLock", "setIsExistSubMenu","handleIsToggleMenu"])

//isSideMenuToggle

const handleSample = (url) => {
    router.push(url)
    emits('handleIsToggle',false);
}

const mainMenuList = ref([]) // 1 depth menus
const subMenuList = ref([]) // 2 depth, 3 depth menus

const selectedMainMenu = ref(null) // 선택한 메인 메뉴
const selectedSubMenu = ref(null) // 선택한 서브 메뉴
const currentMenu = ref(null) // store에 담긴 메뉴


import menuApi from '@/apis/menuApi'
/**
 * 현재 라우터에 대한 메뉴를 세팅해준다.
 */
onBeforeMount( async() => {

    let menuList2 = await menuApi.getMenuList();
    menuList2 = menuList2.data;
    mainMenuList.value = menuList2.filter((item) => item.menuLevel == 1 && item.isUse == 'Y') //첫번째 계층의 메뉴 목록

    //if(store.state.login.userInfo.siteGroupId){
        // const menuList = store.state.login.menuList
            
            mainMenuList.value = menuList2.filter((item) => item.menuLevel == 1 && item.isUse == 'Y') //첫번째 계층의 메뉴 목록

            //const selectedMenu = menuList2.filter((item) => item.siteUrl === currentMenu.value) //선택된 메뉴의 menuCode를 추출해오기 위함
            const selectedMenu = menuList2[3];
            
            // ** 선택된 메뉴의 최상위인 메인 메뉴의 active 설정 **
            // 해당 메뉴가 최상위가 아닌 경우
            if(selectedMenu.length > 0 ){ 
                if(selectedMenu[0].parentMenuCd){
                    const parentMenu = menuList2.filter((item) => item.menuCd == selectedMenu[0].parentMenuCd) // 상위 메뉴 추출
                    //또 다른 상위 메뉴가 있는 경우 최상위 메뉴 추출
                    if(parentMenu.length > 0 ){ 
                        if(parentMenu[0].parentMenuCd){
                            const grandParent = menuList2.filter((item) => item.menuCd == parentMenu[0].parentMenuCd) 
                            selectedMainMenu.value = grandParent[0].menuCd // main menu active 
                        }
                        
                    }
                }else{
                    // 부모 메뉴가 없는 최상위 메뉴 라우터의 경우
                    selectedMainMenu.value = selectedMenu[0].menuCd // main menu active
                }
            }
  //  }

    
    return;


    currentMenu.value = store.getters['commonRefresh/getCurrentMenu']

    //화면 사이즈가 변경될 때
    window.addEventListener('resize', handleResize);

    const menuList = store.state.login.menuList
    
    mainMenuList.value = menuList.filter((item) => item.level === 1 && item.isUse) //첫번째 계층의 메뉴 목록

    if(store.state.login.userInfo.siteGroupId){
        // const menuList = store.state.login.menuList
            
            mainMenuList.value = menuList.filter((item) => item.level === 1 && item.isUse) //첫번째 계층의 메뉴 목록

            const selectedMenu = menuList.filter((item) => item.siteUrl === currentMenu.value) //선택된 메뉴의 menuCode를 추출해오기 위함
            
            // ** 선택된 메뉴의 최상위인 메인 메뉴의 active 설정 **
            // 해당 메뉴가 최상위가 아닌 경우
            if(selectedMenu.length > 0 ){ 
                if(selectedMenu[0].parentMenuCode){
                    const parentMenu = menuList.filter((item) => item.menuCode === selectedMenu[0].parentMenuCode) // 상위 메뉴 추출
                    //또 다른 상위 메뉴가 있는 경우 최상위 메뉴 추출
                    if(parentMenu.length > 0 ){ 
                        if(parentMenu[0].parentMenuCode){
                            const grandParent = menuList.filter((item) => item.menuCode === parentMenu[0].parentMenuCode) 
                            selectedMainMenu.value = grandParent[0].menuCode // main menu active 
                        }
                        
                    }
                }else{
                    // 부모 메뉴가 없는 최상위 메뉴 라우터의 경우
                    selectedMainMenu.value = selectedMenu[0].menuCode // main menu active
                }
            }
    }

})

onMounted(() => {
    sortByMenuCode(mainMenuList.value) //임시로  메인 메뉴 정렬 작업
})

/**
 * 메인 메뉴 선택했을 때 class 활성화
 */
const handleActiveMainMenu = (value) => {
    selectedMainMenu.value = value;

    const menuList = store.state.login.menuList
    const subMenus = checkCurrentMenuExistSubMenu() //현재 선택된 메뉴가 서브 메뉴를 갖고있는지 확인
    
    subMenuList.value = subMenus

    // 서브메뉴가 있을 때에만 서브 메뉴가 보여지고 토글 활성화가 가능
    if(subMenus.length > 0){
        if(!props.isSideMenuToggle){
            emits('handleIsToggleMenu', true)
        }
        emits('setIsExistSubMenu', true)
    }else{
        emits('handleIsToggleMenu', false)
        // 하위 메뉴가 없는 경우
        const mainMenu = menuList.filter((item) => item.menuCode === selectedMainMenu.value)
        if(mainMenu.length > 0 && mainMenu[0].siteUrl){
            //하위 메뉴가 없는 경우 화면 이동
            router.push(mainMenu[0].siteUrl)    
        }
        if(window.innerWidth <= 1280){
            emits('setIsExistSubMenu', true)
        }else{
            emits('setIsExistSubMenu', false)
        }
    }
}

/**
 * 서브 메뉴 선택했을 때 class 활성화
 */
const handleActiveSubMenu = (depth3) => {

    selectedSubMenu.value = depth3.menuCode;
    // unlock인 경우에만 메뉴를 선택했을 때 서브메뉴 영역이 비활성화
    if(!props.isLock){
        emits('handleIsToggle', false)
    }
    router.push(depth3.siteUrl) // 화면 이동
}

/**
 * 사이즈 변경
 */
const handleResize = () => {
    if(window.innerWidth <= 1280){
        emits('setIsExistSubMenu', true)
    }else{
        // PC의 경우 sub menu를 갖고 있는지 여부 확인해서
        const subMenus = checkCurrentMenuExistSubMenu()
        if(subMenus.length > 0){
            //서브 메뉴 목록을 갖고 있는 경우
            emits('setIsExistSubMenu', true)
        }else {
            //서브 메뉴가 없는 경우
            emits('setIsExistSubMenu', false)
        }
    }
}

/**
 * 메뉴 코드별 정렬 기능 
 * TODO: 현재는 임시 작업 Back-End 단에 order by 관한 문의를 드려놓은 상태. 답변 오면 추후 확인 필요
 */
const sortByMenuCode = (array) => {
    array.sort((a, b) => {
        if (a.menuCode < b.menuCode) {
            return -1;
        }
        if (a.menuCode > b.menuCode) {
            return 1;
        }
        return 0;
    })
}

/**
 * 현재 메뉴가 서브 메뉴를 갖고 있으면 반환
 */
const checkCurrentMenuExistSubMenu = () => {
    const menuList = store.state.login.menuList

    // 1depth 메뉴를 눌렀을 때 그에 해당하는 2depth 메뉴, 3depth 메뉴를 세팅한다.
    const depth2Menu  = menuList.filter((item) => item.level === 2 && item.isUse && selectedMainMenu.value === item.parentMenuCode)

    sortByMenuCode(depth2Menu) // 메뉴 코드별 정렬
    

    let subMenus = []
    depth2Menu.map((depth2) => {
        let subMenu = {}
        subMenu = depth2
        const depth3Menu = menuList.filter((item) => item.level === 3 && item.isUse && item.parentMenuCode === depth2.menuCode)
        sortByMenuCode(depth3Menu) // 메뉴 코드별 정렬

        subMenu[depth2.menuCode] = depth3Menu
        subMenus.push(subMenu)
    })

    return subMenus
}

/**
 * 선택한 대메뉴가 변경됐을 때
 */
watch(() => selectedMainMenu.value, () => {
    const menuList = store.state.login.menuList
    const subMenus = checkCurrentMenuExistSubMenu() //현재 선택된 메뉴가 서브 메뉴를 갖고있는지 확인
    
    subMenuList.value = subMenus

    // 서브메뉴가 있을 때에만 서브 메뉴가 보여지고 토글 활성화가 가능
    if(subMenus.length > 0){
        if(props.isLock){
             emits('handleIsToggle', true)
        }
        emits('setIsExistSubMenu', true)
    }else{
        // 하위 메뉴가 없는 경우
        const mainMenu = menuList.filter((item) => item.menuCode === selectedMainMenu.value)
        if(mainMenu.length > 0 && mainMenu[0].siteUrl){
            //하위 메뉴가 없는 경우 화면 이동
            router.push(mainMenu[0].siteUrl)    
        }
        if(window.innerWidth <= 1280){
            emits('setIsExistSubMenu', true)
        }else{
            emits('setIsExistSubMenu', false)
        }
    }
})




/**
 * router가 변경됐을 때
 */
watch(() => store.getters['commonRefresh/getCurrentMenu'], () => {
    currentMenu.value = store.getters['commonRefresh/getCurrentMenu']
})

onUnmounted(() => {
     window.removeEventListener('resize', handleResize);
})


</script>
