<template>
    <router-view />

    <popup-alert v-if="store.state.alert.isPopup"/>
    <popup-confirm v-if="store.state.confirm.isPopup"/>
</template>

<script setup>
import store from "./store/store"
import PopupAlert from "@/components/layout/PopupAlert.vue"
import PopupConfirm from "@/components/layout/PopupConfirm.vue"


</script>

<style>

</style>
