<template>
  <div class="popup alert show">
      <div class="popup-wrap">
          <div class="popup-title">
              <h2 hidden></h2>
              <h4 class="f-bold f-center mb-14">{{store.state.alert.title}}</h4>
          </div>

          <div class="popup-content mb-30">
              <p class="f-center body-md">{{store.state.alert.message}}</p>
          </div>

          <div class="popup-bottom">
              <button type="button" class="btn medium filled w-100"  @click="handleClose">확인</button>
          </div>
      </div>
  </div>
</template>
<script setup>
  

import { useStore } from 'vuex';

const store = useStore();

  const handleClose= async () => {
    const callback = store.getters['alert/getCallback']
    //함수면 콜백
    if(typeof callback === 'function' ){
      await callback()
    }

    await store.dispatch("alert/close")
  }
</script>

