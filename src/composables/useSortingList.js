import {ref, computed} from 'vue';

export const useSortingList = (filteredContacts) => {
  const sortOrder = ref('date DESC');
  const sortOptions = ref(['date DESC', 'date ASC', 'name DESC', 'name ASC']);

  const currentSortList = computed(() => {
    const obj = {
      [sortOptions.value[0]]: sortByDateDesc.value,
      [sortOptions.value[1]]: sortByDateAsc.value,
      [sortOptions.value[2]]: sortByNameDesc.value,
      [sortOptions.value[3]]: sortByNameAsc.value
    };
    return obj[sortOrder.value];
  });

  const sortByDateDesc = computed(() => {
    return [...filteredContacts.value].sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return dateB > dateA ? 1 : dateB < dateA ? -1 : 0;
    });
  });

  const sortByDateAsc = computed(() => {
    return [...filteredContacts.value].sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
    });
  });

  const sortByNameDesc = computed(() => {
    return [...filteredContacts.value].sort((a, b) => {
      const fullNameA = `${a.firstName} ${a.lastName}`;
      const fullNameB = `${b.firstName} ${b.lastName}`;
      return fullNameB.localeCompare(fullNameA);
    });
  });

  const sortByNameAsc = computed(() => {
    return [...filteredContacts.value].sort((a, b) => {
      const fullNameA = `${a.firstName} ${a.lastName}`;
      const fullNameB = `${b.firstName} ${b.lastName}`;
      return fullNameA.localeCompare(fullNameB);
    });
  });

  return {sortOrder, sortOptions, currentSortList};
};
