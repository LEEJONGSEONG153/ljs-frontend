<template>
    <ul class="my-info-card show">
        <li>
            <span class="icon bell-ringing size20">알림</span>
            <p>알림 푸시</p>
            <el-switch
                v-model="value2"
                class="ml-2"
                style="--el-switch-on-color: #3F67C5; --el-switch-off-color: #BFC9D4"
                @change="changeStatusPushAlert(checked)"
                />      
        </li>
        <li @click="gotoMyInfoMng">
            <span class="icon user-card size20">내 정보</span>
            <p>내 정보 관리</p>
        </li>
        <li @click="$emit('logout')">
            <span class="icon logout size20">로그아웃</span>
            <p>로그아웃</p>
        </li>
    </ul>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 알림푸시 활성화/비활성화
const changeStatusPushAlert = (checked) => {
  console.log(`푸쉬 알림 상태 변경 준비중 :: ${checked}`);

  // TODO: 푸쉬 알림 상태 변경 API 추가
};

// 정보 변경 화면 이동
const gotoMyInfoMng = () => {
  router.push('/myInfoMng');
};
</script>
