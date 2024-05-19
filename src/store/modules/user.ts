import { defineStore } from 'pinia'

const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: '',
      userName: '',
      avatar: '',
    }
  },
  actions: {},
  getters: {},
})

export default useUserStore
