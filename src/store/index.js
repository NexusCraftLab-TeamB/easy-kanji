import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state() {
        return {
            apiData: JSON.parse(localStorage.getItem('apiData')) || [],
            location: localStorage.getItem('location') || '',
            genre: localStorage.getItem('genre') || '',
            budget: localStorage.getItem('budget') || '',
            performance: localStorage.getItem('performance') || '',
            submited: localStorage.getItem('submited') === 'true',
            searchError: false,
        };
    },
    mutations: {
        setApiData(state, data) {
            state.apiData = data;
            localStorage.setItem('apiData', JSON.stringify(data));
        },
        setLocation(state, location) {
            state.location = location;
            localStorage.setItem('location', location);
        },
        setGenre(state, genre) {
            state.genre = genre;
            localStorage.setItem('genre', genre);
        },
        setBudget(state, budget) {
            state.budget = budget;
            localStorage.setItem('budget', budget);
        },
        setPerformance(state, performance) {
            state.performance = performance;
            localStorage.setItem('performance', performance);
        },
        setSubmited(state, submitted) {
            state.submited = submitted;
            localStorage.setItem('submited', submitted);
        },
        setSearchError(state, error) {
            state.searchError = error;
        },
        resetState(state) {
            state.location = '';
            state.genre = '';
            state.budget = '';
            state.performance = '';
            state.submited = false;
            state.apiData = [];
            state.searchError = false;
            localStorage.clear();
        }
    },
    actions: {
        async fetchData({ commit }, formData) {
            try {
                const params = {
                    name: formData.name || undefined,
                    location: formData.location || undefined,
                    genre: formData.genre || undefined,
                    budget: formData.budget || undefined,
                    performance: formData.performance || undefined,
                };

                const response = await axios.get('https://z7amnjz9n1.execute-api.ap-northeast-1.amazonaws.com/dev/home', { params });
                commit('setApiData', response.data);
                commit('setSearchError', false);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    commit('setSearchError', true);
                    commit('setApiData', []);
                } else {
                    console.error('Error fetching data:', error);
                }
            }
        }
    },
    getters: {
        apiData: (state) => state.apiData,
        location: (state) => state.location,
        genre: (state) => state.genre,
        budget: (state) => state.budget,
        performance: (state) => state.performance,
        submited: (state) => state.submited,
        searchError: (state) => state.searchError,
    }
});

export default store;
