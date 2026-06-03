// do-tracking.js
Vue.component('do-tracking', {
    template: '#tpl-tracking',
    props: ['data'],
    data() { return { search: '' }; },
    methods: {
        doSearch() { alert('Mencari: ' + this.search); }
    }
});
