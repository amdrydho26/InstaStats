import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({

    followers: [],
    following: []

  }),
  actions: {

    setFollowers(data) {
      this.followers = data
      localStorage.setItem('followers', JSON.stringify(data))
    },

    setFollowing(data) {
      this.following = data
      localStorage.setItem('following', JSON.stringify(data))
    },

    loadFromStorage() {
      const f1 = localStorage.getItem('followers')
      const f2 = localStorage.getItem('following')
      if (f1) this.followers = JSON.parse(f1)
      if (f2) this.following = JSON.parse(f2)
    },

    clearLocal(type) {
      if (localStorage.getItem(type)) {
          localStorage.removeItem(type);
          type === 'followers' ? this.followers = [] : this.following = [];
          console.log(`Menghapus ${type}`);
      }
    }
  }
})
