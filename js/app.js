Vue.filter('rupiah', val => 'Rp ' + val.toLocaleString());
Vue.filter('unit', val => val + ' buah');

new Vue({
    el: '#app',
    data() {
        return {
            tab: 'stok',
            state: { upbjjList: [], kategoriList: [], stok: [], tracking: [], paket: [] }
        };
    },
    async created() {
        const data = await ApiService.fetchBahanAjar();
        this.state = data;
    }
});
