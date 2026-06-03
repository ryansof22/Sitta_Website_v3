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
    watch: {
        // Watcher 1: Memantau perpindahan tab
        tab(newTab) {
            console.log(`User berpindah ke halaman: ${newTab}`);
        },
        // Watcher 2: Memantau jika data stok berubah (misal setelah hapus)
        'state.stok': function(newList) {
            console.log("Terjadi perubahan pada data stok bahan ajar.");
        }
    },
    async created() {
        const data = await ApiService.fetchBahanAjar();
        this.state = data;
    }
});
