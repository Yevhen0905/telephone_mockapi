<template>
  <div class="contact_list">
    <h1 class="contact_title">Contact List</h1>
    <Loader v-if="loading" />
    <div v-else class="contacts_wrapper">
      <div class="contact_action">
        <SearchContact v-model="search" />
        <SortingKey :sort-options="sortOptions" v-model="sortOrder" />
        <FavoritesFilter :list="listFavorites" v-model="favoritesToggle" />
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
      <div v-else class="no_contact_text">{{ noContactMessage }}</div>
    </div>
  </div>
</template>

<script setup>
  import Loader from '../components/Loader.vue';
  import Pagination from '../components/Pagination.vue';
  import SortingKey from '../components/SortingKey.vue';
  import ContactCard from '../components/ContactCard.vue';
  import SearchContact from '../components/SearchContact.vue';
  import FavoritesFilter from '../components/FavoritesFilter.vue';

  import {ref, computed, onMounted} from 'vue';
  import {useContactsStore} from '@/stores/contacts';
  import {useSearch} from '@/composables/useSearch';
  import {useFavorites} from '@/composables/useFavorites';
  import {useSortingList} from '@/composables/useSortingList';

  const loading = ref(true);
  const pageSize = 5;
  const currentPage = ref(1);
  const favoritesToggle = ref('all');
  const listFavorites = ref([
    {
      value: 'all',
      text: 'All'
    },
    {
      value: 'favorites',
      text: 'Favorites'
    }
  ]);

  const contactStore = useContactsStore();
  contactStore.fetchContact();

  const contacts = computed(() => contactStore.contacts);

  const {search, filteredContacts} = useSearch(contacts);

  const {sortOrder, sortOptions, currentSortList} =
    useSortingList(filteredContacts);

  const {currentList} = useFavorites(favoritesToggle, currentSortList);

  const paginatedContacts = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return currentList.value.slice(startIndex, endIndex);
  });

  const totalPages = computed(() =>
    Math.ceil(currentList.value.length / pageSize)
  );

  const handlePageChange = (page) => {
    currentPage.value = page;
  };

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

  .no_contact_text {
    font-size: 35px;
    background: linear-gradient(45deg, #0720a1, #201b20 27%, #50390f);
    color: #ebeef4;
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
    text-align: center;
    margin-top: 50px;
  }
</style>
