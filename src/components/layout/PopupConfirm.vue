<template>

  <div class="popup confirm show">
      <div class="popup-wrap">
          <div class="popup-title">
              <h2 hidden></h2>
              <h4 class="f-bold f-center mb-14">{{store.state.confirm.title}}</h4>
          </div>

          <div class="popup-content mb-30">
              <p class="f-center body-md">{{store.state.confirm.message}}</p>
          </div>

          <div class="popup-bottom flex-cc gap-10">
              <button type="button" class="btn medium filled w-100" @click="handleOk">확인</button>
              <button type="button" class="btn medium outlined w-100" @click="handleClose">닫기</button>
          </div>
      </div>
  </div>

</template>
<script setup>
  

import { useStore } from 'vuex';

const store = useStore();

  const handleClose= async () => {
    const cancelCallback = store.getters['confirm/getCancelCallback']
    //함수면 콜백
    if(typeof cancelCallback === 'function' ){
      await cancelCallback()
    }

    await store.dispatch("confirm/close")
  }

    const handleOk= async () => {
    const callback = store.getters['confirm/getCallback']
    //함수면 콜백
    if(typeof callback === 'function' ){
      await callback()
    }
    await store.dispatch("confirm/close")
  }


</script>

