Vue.component('ba-stock-table', {
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
            let data = this.items.filter(i => {
                return (this.filterUPBJJ === '' || i.upbjj === this.filterUPBJJ) &&
                       (this.filterKategori === '' || i.kategori === this.filterKategori);
            });
            if (this.sortKey) {
                data.sort((a, b) => a[this.sortKey] > b[this.sortKey] ? 1 : -1);
            }
            return data;
        }
    },
    methods: {
        resetFilter() { this.filterUPBJJ = ''; this.filterKategori = ''; },
        sortBy(key) { this.sortKey = key; },
        deleteItem(item) {
            this.$root.$refs.modal.show(`Menghapus ${item.judul}...`);
        }
    }
});
