<template>

        <!-- 사이드바 -->
        <nav>
            <div class="main-category">
                <h1>
                    <a href="./index.html">CRK</a>
                </h1>
    
                <ul>
                    <li class="active">
                        <a href="">
                            <span class="icon dashboard">대시보드</span>
                            대시보드
                        </a>
                    </li>
    
                    <li>
                        <a href="">
                            <span class="icon monitoring">모니터링</span>
                            모니터링
                        </a>
                    </li>
    
                    <li>
                        <a href="">
                            <span class="icon remote-control">원격제어</span>
                            원격제어
                        </a>
                    </li>
    
                    <li>
                        <a href="">
                            <span class="icon service">서비스</span>
                            서비스
                        </a>
                    </li>
    
                    <li>
                        <a href="">
                            <span class="icon analyze">분석</span>
                            분석
                        </a>
                    </li>
    
                    <li>
                        <a href="">
                            <span class="icon basic">기본</span>
                            기본
                        </a>
                    </li>
    
                    <li>
                        <a href="">
                            <span class="icon setting">설정</span>
                            설정
                        </a>
                    </li>
    
                    <li>
                        <a href="">
                            <span class="icon admin">관리자</span>
                            관리자
                        </a>
                    </li>
    
                    <li>
                        <a href="">
                            <span class="icon support">지원센터</span>
                            지원센터
                        </a>
                    </li>
                </ul>
            </div>

            <!-- scrpit!! 잠금 버튼 누르면 sub-category에 fixed 클래스 토글,
            main-category의 각 li에 hover하면 해당 sub-category 나타남 -->
            
            <div class="sub-category " :class="{'fixed' : store.state.common.isToggle }">

                <div class="depth-wrap">
                    <p class="group-title">통합 모니터링</p>

                    <ul>
                        <li><router-link  to="/userMng">사용자 조회</router-link></li>
                        <li><router-link  to="/siteGroupMng">권한 메뉴관리</router-link></li>
                        <li><a href="">매장별</a></li>
                    </ul>
                </div>

                <div class="depth-wrap">
                    <p class="group-title">운전 상태</p>

                    <ul>
                        <li><a href="">위치별</a></li>
                        <li><a href="">제품별</a></li>
                    </ul>
                </div>

                <div class="depth-wrap">
                    <p class="group-title">시스템 상태</p>

                    <ul>
                        <li><a href="">시스템 상태</a></li>
                    </ul>
                </div>

                <div class="depth-wrap">
                    <p class="group-title">알림 정보</p>

                    <ul>
                      <li><router-link  to="/notiSummary">알림 요약</router-link></li>
                      <li><a href="">알림 요약</a></li>
                      <li><router-link  to="/notificationList">알림 내역</router-link></li>
                      <li><a href="">알림 내역</a></li>
                      <li><router-link  to="/notiSettings">알림 설정</router-link></li>
                      <li><a href="">알림 설정</a></li>
                    </ul>
                </div>

                <button type="button" class="btn circle small transparent"><span class="icon lock">잠금</span></button>
            </div>
        </nav>
        <!-- 사이드바 End-->
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();


</script>
