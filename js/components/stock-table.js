// js/components/stock-table.js
Vue.component('ba-stock-table', {
    // Membaca template eksternal secara dinamis
    template: '#tpl-stock', 
    props: ['items', 'upbjjList', 'kategoriList'],
    data() {
        return {
            filterUPBJJ: '',
            filterKategori: '',
            sortKey: ''
        };
    },
    computed: {
        filteredItems() {
            let result = this.items;
            if (this.filterUPBJJ) {
                result = result.filter(item => item.upbjj === this.filterUPBJJ);
            }
            if (this.filterKategori) {
                result = result.filter(item => item.kategori === this.filterKategori);
            }
            if (this.sortKey) {
                result.sort((a, b) => (a[this.sortKey] > b[this.sortKey] ? 1 : -1));
            }
            return result;
        }
    },
    methods: {
        resetFilter() {
            this.filterUPBJJ = '';
            this.filterKategori = '';
        },
        sortBy(key) {
            this.sortKey = key;
        },
        deleteItem(item) {
            // Memanggil modal global lewat root instance
            this.$root.$refs.modal.open(
                'Konfirmasi Penghapusan',
                `Apakah Anda yakin ingin menghapus data stok untuk buku "${item.judul}"?`,
                () => {
                    // Logic callback saat user klik konfirmasi hapus
                    const index = this.items.indexOf(item);
                    if (index > -1) this.items.splice(index, 1);
                }
            );
        }
    }
});
