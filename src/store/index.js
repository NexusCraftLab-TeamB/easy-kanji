import { createStore } from 'vuex';

export default createStore({
  state: {
    location: 'aaaaaaaaaaaaaaa',
    genre: '',
    budget: '',
    performance: '',
    showResults: false,
  },
  mutations: {
    setLocation(state, location) {
      state.location = location;
    },
    setGenre(state, genre) {
      state.genre = genre;
    },
    setBudget(state, budget) {
      state.budget = budget;
    },
    setPerformance(state, performance) {
      state.performance = performance;
    },
    toggleShowResults(state, show) {
      state.showResults = show;
    },
  },
  actions: {
    updateLocation({ commit }, location) {
      commit('setLocation', location);
    },
    updateGenre({ commit }, genre) {
      commit('setGenre', genre);
    },
    updateBudget({ commit }, budget) {
      commit('setBudget', budget);
    },
    updatePerformance({ commit }, performance) {
      commit('setPerformance', performance);
    },
    toggleShowResults({ commit }, show) {
      commit('toggleShowResults', show);
    },
  },
  getters: {
    location: state => state.location,
    genre: state => state.genre,
    budget: state => state.budget,
    performance: state => state.performance,
    showResults: state => state.showResults,
  }
});
