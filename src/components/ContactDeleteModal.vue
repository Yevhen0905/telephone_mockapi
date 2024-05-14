<template>
  <div class="modal_delete" v-if="isActive">
    <div class="background_modal"></div>
    <div class="modal_wrapper">
      <div class="modal_header">
        <div class="modal_header_text">You are about to delete a contact</div>
        <a class="modal_header_cancel" @click="cancel"><span>&#x2715;</span></a>
      </div>
      <div class="modal_body">
        <p class="modal_body_text">
          Are you sure you want to delete <span>{{ fullName }}</span> from your
          contact list?
        </p>
      </div>
      <div class="modal_buttons">
        <button class="modal_button modal_button_delete" @click="deleteContact">
          Yes, delete
        </button>
        <button class="modal_button modal_button_cancel" @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {computed} from 'vue';
  import {useContactsStore} from '@/stores/contacts';

  const contactStore = useContactsStore();

  const contactToDelete = computed(() => {
    return contactStore.contactToDelete;
  });

  const isActive = computed(() => {
    return contactToDelete.value ? true : false;
  });

  const fullName = computed(() => {
    if (contactToDelete.value) {
      return (
        contactToDelete.value.lastName + ' ' + contactToDelete.value.firstName
      );
    }

    return '';
  });

  const deleteContact = () => {
    contactStore.deleteContact(contactToDelete.value);
  };

  const cancel = () => {
    contactStore.setContactToDelete(null);
  };
</script>

<style lang="scss">
  .modal_delete {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    z-index: 40;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  .modal_wrapper {
    position: relative;
    z-index: 2;
    max-width: 700px;
    width: 100%;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
  }

  .background_modal {
    background: #615f5f99;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }

  .modal_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: rgba(216, 216, 216, 0.75);
    border-bottom: 1px solid #c5bbbb;
  }

  .modal_header_text {
    font-size: 22px;
  }

  .modal_header_cancel {
    position: relative;
    color: #242323;
    width: 24px;
    height: 24px;
    background: #9b9a9a;
    border-radius: 50%;
    cursor: pointer;

    span {
      position: absolute;
      color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover {
      opacity: 0.6;
    }
  }

  .modal_body {
    padding: 40px 20px;

    &_text {
      font-size: 20px;
      color: grey;

      span {
        font-size: 20px;
        font-weight: 700;
        color: black;
      }
    }
  }

  .modal_buttons {
    padding: 15px 20px;
    background-color: rgba(216, 216, 216, 0.75);
    border-top: 1px solid #c5bbbb;
    text-align: right;
  }

  .modal_button {
    padding: 6px 16px;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;

    &.modal_button_delete {
      background: rgb(187, 39, 36);
      margin-right: 20px;
    }

    &.modal_button_cancel {
      background: yellowgreen;
    }

    &:hover {
      opacity: 0.6;
    }
  }
</style>
