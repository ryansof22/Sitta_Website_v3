// js/app.js

// 1. Registrasi Global Filters untuk formatting teks
Vue.filter('currency', function (value) {
    if (!value) return 'Rp 0';
    return 'Rp ' + value.toLocaleString('id-ID');
});

Vue.filter('qtyUnit', function (value) {
    if (value === undefined || value === null) return '0 buah';
    return value + ' buah';
});

// 2. Root Vue Instance
new Vue({
    el: '#app',
    data() {
        return {
            tab: 'stok', // State navigasi: 'stok' | 'tracking' | 'order'
            state: {
                upbjjList: [],
                kategoriList: [],
                pengirimanList: [],
                paket: [],
                stok: [],
                tracking: []
            }
        };
    },
    async created() {
        // Fetch data saat root instance di-mount
        const data = await ApiService.fetchData();
        if (data) {
            this.state = data;
        }
    },
    methods: {
        handleUpdateStok(item) {
            // Contoh interaksi dengan global modal
            this.$refs.modal.open(
                'Edit Stok Bahan Ajar',
                `Apakah Anda ingin mengubah data untuk ${item.judul}?`,
                () => {
                    console.log('User mengonfirmasi edit untuk:', item.kode);
                }
            );
        },
        handleNewOrder(newOrder) {
            console.log('Order baru diterima:', newOrder);
        },
        handleAddProgress(progressData) {
            console.log('Progress DO bertambah:', progressData);
        }
    }
});
