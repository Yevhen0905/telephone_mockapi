<template>
  <div class="contact_list">
    <h1 class="contact_title">Contact List</h1>
    <div v-if="loading" class="loader">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-else class="contacts_wrapper">
      <div class="contact_action">
        <div class="contact_input">
          <label class="contact_label">Search</label>
          <input
            class="input"
            type="text"
            placeholder="search by name or telephone..."
            v-model="search"
          />
        </div>
        <SortingKey
          :sort-options="sortOptions"
          :order="sortOrder"
          @sort-order-change="handleSortOrderChange"
        />

        <div class="contact_input contact_input_radio">
          <div class="contact_label">Show</div>
          <div class="wrapper_radio">
            <label class="label_radio">
              <input
                class="radio"
                type="radio"
                value="all"
                v-model="favoritesToggle"
              />
              All
            </label>
            <label class="label_radio">
              <input
                class="radio"
                type="radio"
                value="favorites"
                v-model="favoritesToggle"
              />
              Favorites
            </label>
          </div>
        </div>
      </div>
      <div v-if="paginatedContacts.length" class="wrapper_contact">
        <ContactCard
          v-for="contact in paginatedContacts"
          :key="contact.id"
          :contact="contact"
        />
        <Pagination
          v-show="totalPages > 1"
          :totalPages="totalPages"
          :currentPage="currentPage"
          @pageChange="handlePageChange"
        />
      </div>
      <div v-else class="no_contact">{{ noContactMessage }}</div>
    </div>
  </div>
</template>

<script setup>
  import ContactCard from '../components/ContactCard.vue';
  import Pagination from '../components/Pagination.vue';
  import SortingKey from '../components/SortingKey.vue';

  import {ref, computed, onMounted} from 'vue';
  import {useContactsStore} from '@/stores/contacts';
  import {useSearch} from '@/composables/useSearch';
  import {useSortingList} from '@/composables/useSortingList';
  import {useFavorites} from '@/composables/useFavorites';

  const loading = ref(true);
  const pageSize = 5;
  const currentPage = ref(1);

  const contactStore = useContactsStore();
  contactStore.fetchContact();

  const contacts = computed(() => contactStore.contacts);

  const {search, filteredContacts} = useSearch(contacts);

  const {sortOrder, sortOptions, currentSortList} =
    useSortingList(filteredContacts);

  const favoritesToggle = ref('all');
  const {currentList} = useFavorites(favoritesToggle, currentSortList);

  const paginatedContacts = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return currentList.value.slice(startIndex, endIndex);
  });

  const totalPages = computed(() =>
    Math.ceil(currentList.value.length / pageSize)
  );

  const noContactMessage = computed(() => {
    if (paginatedContacts.value.length === 0) {
      if (favoritesToggle.value === 'favorites') {
        return 'No favorite contacts.';
      } else {
        return 'No contacts found. Click the Add contact button above to add one.';
      }
    } else {
      return '';
    }
  });

  const handlePageChange = (page) => {
    currentPage.value = page;
  };

  const handleSortOrderChange = (value) => {
    sortOrder.value = value;
  };

  onMounted(() => {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  });
</script>

<style lang="scss">
  .contact_action {
    display: flex;
    gap: 25px;

    @media only screen and (max-width: 800px) {
      gap: 5px;
    }

    @media only screen and (max-width: 590px) {
      flex-direction: column;
    }
  }

  .select {
    padding: 7px 10px;
  }

  .wrapper_radio {
    display: flex;
    gap: 14px;
  }

  .label_radio {
    display: flex;
    font-size: 16px;
    align-items: center;
    gap: 3px;
  }

  .radio {
    width: 20px;
    height: 20px;
  }

  .no_contact {
    text-align: center;
    padding-top: 50px;
    font-size: 27px;
  }

  .bg_img_list {
    background-image: url('../assets/img/book-159880_1280.webp');
    background-size: cover;
    background-position: left top;
    background-repeat: no-repeat;
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    &::before {
      content: '';
      backdrop-filter: blur(10px);
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  .bg_img {
    background-image: url('../assets/img/black-iphone-5-3.jpg');
    background-size: cover;
    background-position: left top;
    background-repeat: no-repeat;
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    &::before {
      content: '';
      backdrop-filter: blur(6px);
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  .no_contact_text {
    font-size: 35px;
    background: linear-gradient(45deg, #0720a1, #201b20 27%, #50390f);
    color: #ebeef4;
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
    text-shadow: 4px 1px 2px #230fcb;
  }

  .contact_input_radio {
    margin-left: 10px;
  }

  .loader {
    display: flex;
    justify-content: center;
    margin-top: 90px;
    color: #00a6ff;
  }

  .lds-ripple,
  .lds-ripple div {
    box-sizing: border-box;
  }
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid currentColor;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 8px;
      height: 8px;
      opacity: 0;
    }
    4.9% {
      top: 36px;
      left: 36px;
      width: 8px;
      height: 8px;
      opacity: 0;
    }
    5% {
      top: 36px;
      left: 36px;
      width: 8px;
      height: 8px;
      opacity: 1;
    }
    100% {
      top: 0;
      left: 0;
      width: 80px;
      height: 80px;
      opacity: 0;
    }
  }
</style>
