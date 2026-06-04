new Vue({
  el: '#app',
  data() {
    return {
      tab: 'stok',
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
    try {
      const data = await ApiService.fetchData();
      this.state = data;
      // Inisialisasi array tracking jika belum ada di JSON
      if(!this.state.tracking) this.$set(this.state, 'tracking', []);
    } catch (e) {
      console.error("Gagal inisialisasi aplikasi", e);
    }
  },
  methods: {
    handleCreateStock(item) { this.state.stok.push(item); },
    handleUpdateStock(item) {
      const idx = this.state.stok.findIndex(i => i.kode === item.kode);
      if (idx !== -1) this.state.stok.splice(idx, 1, item);
    },
    handleDeleteStock(kode) {
      this.state.stok = this.state.stok.filter(i => i.kode !== kode);
    },
    handleNewDO(payload) {
      const id = `DO${new Date().getFullYear()}-${String(this.state.tracking.length + 1).padStart(4, '0')}`;
      this.state.tracking.push({
        id, ...payload,
        perjalanan: [{ waktu: new Date().toLocaleString('id-ID'), keterangan: 'Pesanan Dibuat' }]
      });
    }
  }
});
