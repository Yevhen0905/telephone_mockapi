import {ref, computed} from 'vue';

export const useSearch = (contacts) => {
  const search = ref('');
  const filteredContacts = computed(() => {
    return contacts.value.filter((contact) => {
      const searchValue = search.value.toLowerCase();
      return (
        contact.firstName.toLowerCase().includes(searchValue) ||
        contact.lastName.toLowerCase().includes(searchValue) ||
        contact.phoneNumber.toLowerCase().includes(searchValue)
      );
    });
  });

  return {search, filteredContacts};
};
