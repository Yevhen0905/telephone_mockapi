import {createRouter, createWebHistory} from 'vue-router';
import ContactList from '../views/ContactList.vue';
import {useContactsStore} from '@/stores/contacts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: ContactList
    },
    {
      path: '/contact/create',
      name: 'create',
      component: () => import('../views/ContactCreate.vue')
    },
    {
      path: '/contact/:id',
      name: 'edit',
      component: () => import('../views/ContactEdit.vue'),
      props: true,
      beforeEnter: (_, from) => {
        const contactStore = useContactsStore();
        if (from.matched.length === 0) {
          contactStore.fetchContact();
        }
      }
    }
  ]
});

export default router;
