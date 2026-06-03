new Vue({
  el: '#app',
  data() {
    return {
      tab: 'stok', // Mengelola tab state sesuai spesifikasi tugas[cite: 1]
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
      // Membaca data JSON via service api.js[cite: 1]
      const data = await ApiService.fetchData();
      this.state.upbjjList = data.upbjjList || [];
      this.state.kategoriList = data.kategoriList || [];
      this.state.pengirimanList = data.pengirimanList || [];
      this.state.paket = data.paket || [];
      this.state.stok = data.stok || [];
      this.state.tracking = data.tracking || [];
    } catch (e) {
      alert('Sistem mendeteksi kegagalan sinkronisasi berkas dummy JSON.');
    }
  },
  methods: {
    handleCreateStock(newStock) {
      this.state.stok.push(newStock);[cite: 1]
    },
    handleUpdateStock(updatedStock) {
      const idx = this.state.stok.findIndex(i => i.kode === updatedStock.kode);
      if (idx !== -1) {
        this.state.stok.splice(idx, 1, updatedStock);[cite: 1]
      }
    },
    handleDeleteStock(kode) {
      this.state.stok = this.state.stok.filter(i => i.kode !== kode);[cite: 1]
    },
    handleNewDO(doPayload) {
      // Auto-generate ID Nomor DO sesuai spesifikasi[cite: 1]
      const currentYear = new Date().getFullYear(); // Dinamis tahun berjalan[cite: 1]
      
      // Ambil riwayat urutan teratas berlandaskan tahun ini
      const prefix = `DO${currentYear}-`;
      const sameYearDOs = this.state.tracking.filter(t => t.id.startsWith(prefix));
      
      let nextSequence = 1;
      if (sameYearDOs.length > 0) {
        // Ekstrak angka urutan terbesar yang ada
        const numbers = sameYearDOs.map(t => parseInt(t.id.replace(prefix, ''), 10));
        nextSequence = Math.max(...numbers) + 1;
      }
      
      const generatedID = `${prefix}${String(nextSequence).padStart(4, '0')}`;[cite: 1]
      
      // Konstruksi objek baru log tracking
      const newTrackingObject = {
        id: generatedID,
        nim: doPayload.nim,[cite: 1]
        nama: doPayload.nama,[cite: 1]
        status: doPayload.status,
        ekspedisi: doPayload.ekspedisi,[cite: 1]
        tanggalKirim: doPayload.tanggalKirim,[cite: 1]
        paket: doPayload.paket,[cite: 1]
        total: doPayload.total,[cite: 1]
        perjalanan: [
          {
            waktu: new Date().toISOString().replace('T', ' ').substring(0, 19),[cite: 1]
            keterangan: `Dokumen manifes ${generatedID} berhasil diterbitkan.`[cite: 1]
          }
        ]
      };

      this.state.tracking.push(newTrackingObject);
    }
  }
});
