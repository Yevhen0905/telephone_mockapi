import {defineStore} from 'pinia';

export const useContactsStore = defineStore('contact', {
  state: () => ({
    contacts: [],
    contactToDelete: null
  }),

  getters: {
    getContactById: (state) => {
      return (id) =>
        state.contacts.find((contact) => parseInt(contact.id) === id);
    },
    getContactByPhone: (state) => {
      return (phoneNumber) =>
        state.contacts.find((contact) => contact.phoneNumber === phoneNumber);
    }
  },

  actions: {
    async fetchContact() {
      try {
        const res = await fetch(
          'https://6634f1519bb0df2359a34ac7.mockapi.io/api/contacts/'
        );
        const data = await res.json();
        this.contacts = data;
        console.log(this.contacts);
      } catch (error) {
        console.log(error);
      }
    },
    async createContact(newContact) {
      try {
        const res = await fetch(
          'https://6634f1519bb0df2359a34ac7.mockapi.io/api/contacts/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
          }
        );
        const data = await res.json();
        this.contacts.push(data);
      } catch (error) {
        console.error('Error creating contact:', error);
      }
    },
    async deleteContact(contact) {
      try {
        const res = await fetch(
          `https://6634f1519bb0df2359a34ac7.mockapi.io/api/contacts/${contact.id}`,
          {
            method: 'DELETE'
          }
        );
        if (res.ok) {
          this.contacts = this.contacts.filter((c) => c.id !== contact.id);
          this.contactToDelete = null;
        } else {
          throw new Error('Failed to delete contact');
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    },
    async editContact(contact) {
      try {
        const res = await fetch(
          `https://6634f1519bb0df2359a34ac7.mockapi.io/api/contacts/${contact.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
          }
        );
        if (res.ok) {
          const updatedContact = await res.json();
          const index = this.contacts.findIndex((c) => c.id === contact.id);
          this.contacts.splice(index, 1, updatedContact);
        } else {
          throw new Error('Failed to update contact');
        }
      } catch (error) {
        console.error('Error updating contact:', error);
      }
    },
    setContactToDelete(contact) {
      this.contactToDelete = contact;
    }
  }
});
