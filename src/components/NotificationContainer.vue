<template>
  <div class="notification_container">
    <NotificationModal
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script setup>
  import NotificationModal from './NotificationModal.vue';

  import {computed} from 'vue';
  import {useNotificationStore} from '../stores/notification';

  const notificationStore = useNotificationStore();

  const notifications = computed(() => {
    return notificationStore.notifications;
  });
</script>

<style lang="scss">
  .notification_container {
    position: relative;
    position: fixed;
    z-index: 10;
    width: 300px;
    right: 20px;
    bottom: 10px;
  }
</style>
