<template>
  <div class="wrapper_card">
    <form class="form">
      <div class="contact_input">
        <label class="contact_label">First name</label>
        <input
          class="input"
          type="text"
          placeholder="enter..."
          v-model="firstName"
          @blur="firstNameTouch = true"
        />
        <p v-if="firstNameError" class="error">This field is required</p>
      </div>
      <div class="contact_input">
        <label class="contact_label">Last name</label>
        <input
          class="input"
          type="text"
          placeholder="enter..."
          v-model="lastName"
          @blur="lastNameTouch = true"
        />
        <p v-if="lastNameError" class="error">This field is required</p>
      </div>
      <div class="contact_input">
        <label class="contact_label">Phone number</label>
        <input
          class="input"
          type="tel"
          placeholder="+380..."
          v-model="phoneNumber"
          @blur="phoneNumberTouch = true"
          @input="onPhoneNumberChange"
        />
        <p v-if="alreadyHavePhoneNumber" class="error">
          phone number is already available
        </p>
        <p v-if="phoneNumberError" class="error">This field is required</p>
      </div>
    </form>
    <div class="form_buttons">
      <button class="form_btn confirm_btn" @click.prevent="confirm">
        Confirm
      </button>
      <button class="form_btn clear_btn" @click.prevent="clearForm">
        Clear
      </button>
      <RouterLink :to="{name: 'list'}">
        <button class="form_btn cancel_btn">Cancel</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
  import {ref, computed, onMounted} from 'vue';
  import {useRouter} from 'vue-router';

  import {useContactsStore} from '../stores/contacts';

  const props = defineProps({
    contactId: {
      type: Number,
      required: false
    }
  });
  console.log(props.contactId);

  const router = useRouter();
  const contactStore = useContactsStore();

  const firstName = ref('');
  const lastName = ref('');
  const phoneNumber = ref('');
  const firstNameTouch = ref(false);
  const lastNameTouch = ref(false);
  const phoneNumberTouch = ref(false);
  const alreadyHavePhoneNumber = ref(false);

  const getContactById = computed(() => {
    return contactStore.getContactById(props.contactId);
  });

  const getContactByPhone = computed(() => {
    return contactStore.getContactByPhone(phoneNumber.value);
  });

  const firstNameError = computed(() => {
    return !firstName.value && firstNameTouch.value ? true : false;
  });

  const lastNameError = computed(() => {
    return !lastName.value && lastNameTouch.value ? true : false;
  });

  const phoneNumberError = computed(() => {
    return !phoneNumber.value && phoneNumberTouch.value ? true : false;
  });

  const hasErrors = computed(() => {
    return (
      firstNameError.value ||
      lastNameError.value ||
      phoneNumberError.value ||
      alreadyHavePhoneNumber.value
    );
  });

  const getDateTime = () => {
    const today = new Date();

    const date =
      (today.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      today.getDate().toString().padStart(2, '0') +
      '-' +
      today.getFullYear();

    const time =
      today.getHours() +
      ':' +
      today.getMinutes().toString().padStart(2, '0') +
      ':' +
      today.getSeconds().toString().padStart(2, '0');
      
    return date + ' ' + time;
  };

  const edit = () => {
    contactStore.editContact({
      ...getContactById.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phoneNumber.value
    });
  };

  const clearForm = () => {
    firstName.value = '';
    lastName.value = '';
    phoneNumber.value = '';
    alreadyHavePhoneNumber.value = false;
  };

  const create = async () => {
    const id = Math.floor(Math.random() * 10000000);
    await contactStore.createContact({
      id,
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phoneNumber.value,
      created: getDateTime()
    });
  };

  const confirm = () => {
    firstNameTouch.value = true;
    lastNameTouch.value = true;
    phoneNumberTouch.value = true;

    const found = getContactByPhone.value;
    if (found && +found.id !== props.contactId) {
      alreadyHavePhoneNumber.value = true;
      return;
    }

    if (!hasErrors.value) {
      if (props.contactId) {
        edit();
      } else {
        create();
      }
      clearForm();
      router.push({name: 'list'});
    }
  };

  const onPhoneNumberChange = () => {
    alreadyHavePhoneNumber.value = false;
  };

  onMounted(() => {
    if (getContactById.value) {
      firstName.value = getContactById.value.firstName;
      lastName.value = getContactById.value.lastName;
      phoneNumber.value = getContactById.value.phoneNumber;
    }
  });
</script>

<style lang="scss">
  .wrapper_card {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .form_buttons {
    position: relative;
    margin-top: 10px;
  }

  .form_btn {
    padding: 7px 30px;
    outline: none;
    border: none;
    border-radius: 5px;

    &.confirm_btn {
      background-color: rgb(0 0 255 / 58%);
      color: #fff;
      margin-right: 20px;
    }

    &.clear_btn {
      background-color: rgb(151 146 146 / 58%);
      color: #fff;
    }

    &.cancel_btn {
      background-color: rgb(187, 39, 36);
      color: #fff;
      position: absolute;
      right: 0;
    }

    &:hover {
      opacity: 0.6;
    }
  }

  .error {
    position: absolute;
    bottom: 0;
    color: #d13333;
  }
</style>
