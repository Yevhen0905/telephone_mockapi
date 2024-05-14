<template>
  <div class="contact_card">
    <div class="contact_card_header">
      <p class="card_header_name">{{ fullName }}</p>
      <div v-if="contact.favorite" class="favorite_icon">&starf;</div>
    </div>
    <div class="contact_card_info">
      <div class="card_info_number">
        Phone number: <span>{{ contact.phoneNumber }}</span>
      </div>
      <div class="card_info_date">
        Date of creation: <span>{{ getDateTime(contact.created) }}</span>
      </div>
    </div>
    <div class="contact_card_btn">
      <RouterLink
        class="card_btn btn_edit"
        :to="{name: 'edit', params: {id: contact.id}}"
        >Edit</RouterLink
      >
      <a class="card_btn btn_favorite" @click="toggleFavorite">
        {{ favoriteText }}
      </a>
      <div class="card_btn btn_delete" @click="deleteContact">Delete</div>
    </div>
  </div>
</template>

<script setup>
  import {computed} from 'vue';
  import {useContactsStore} from '@/stores/contacts';

  const props = defineProps({
    contact: {
      type: Object,
      required: true
    }
  });

  const contactStore = useContactsStore();

  const fullName = computed(() => {
    return props.contact.lastName + ' ' + props.contact.firstName;
  });

  const getDateTime = (dateString) => {
    const today = new Date(dateString);

    const date =
      today.getDate().toString().padStart(2, '0') +
      '-' +
      (today.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      today.getFullYear();

    const time =
      today.getHours().toString().padStart(2, '0') +
      ':' +
      today.getMinutes().toString().padStart(2, '0') +
      ':' +
      today.getSeconds().toString().padStart(2, '0');

    return date + ' ' + time;
  };

  const favoriteText = computed(() => {
    return props.contact.favorite
      ? 'Remove from Favorites'
      : 'Mark as Favorite';
  });

  function toggleFavorite() {
    contactStore.editContact({
      ...props.contact,
      favorite: props.contact.favorite ? false : true
    });
  }

  const deleteContact = () => {
    contactStore.setContactToDelete(props.contact);
  };
</script>

<style lang="scss">
  .contact_card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgb(224 215 215 / 56%);
    margin: 10px 0px;
    width: 100%;
    overflow: hidden;

    &_header {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 7px 10px 6px;
      border-bottom: 2px solid #d5d5d5;
      background-color: rgba(216, 216, 216, 0.75);
    }

    &_info {
      display: flex;
      justify-content: space-between;
      padding: 26px 10px;
      border-bottom: 2px solid #d5d5d5;

      @media only screen and (max-width: 590px) {
        flex-direction: column;
        padding: 16px 10px;
      }
    }

    &_btn {
      display: flex;
      align-items: center;
    }
  }
  .card_header_name {
    font-weight: 600;
    font-size: 30px;
    color: rgb(69 96 199);

    @media only screen and (max-width: 720px) {
      font-size: 24px;
    }
  }

  .favorite_icon {
    position: absolute;
    right: 11px;
    font-size: 28px;
    color: rgb(36, 46, 187);
  }

  .card_info_number {
    font-size: 20px;

    span {
      font-weight: 600;
      font-size: 20px;
      color: rgb(69 96 199);

      @media only screen and (max-width: 720px) {
        font-size: 17px;
      }
    }

    @media only screen and (max-width: 720px) {
      font-size: 18px;
    }
  }

  .card_info_date {
    font-size: 20px;

    span {
      font-weight: 600;
      font-size: 20px;
      color: rgb(69 96 199);

      @media only screen and (max-width: 720px) {
        font-size: 17px;
      }
    }

    @media only screen and (max-width: 720px) {
      font-size: 18px;
    }
  }

  .card_btn {
    width: 100%;
    text-align: center;
    padding: 10px 10px 9px;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.3s ease-in;

    &:hover {
      background-color: rgb(230, 226, 226);
    }

    &:not(:last-child) {
      border-right: 1px solid #d5d5d5;
    }

    &.btn_edit {
      color: rgb(187, 179, 36);
    }

    &.btn_favorite {
      color: rgb(36, 46, 187);
    }

    &.btn_delete {
      color: rgb(187, 39, 36);
    }

    @media only screen and (max-width: 720px) {
      font-size: 16px;
    }
  }
</style>
