Vue.component('order-form', {
  template: '#tpl-order',
  props: {
    paketList: { type: Array, required: true },
    ekspedisiList: { type: Array, required: true }
  },
  data() {
    return {
      selectedPaketIndex: -1,[cite: 1]
      payload: {
        nim: '',[cite: 1]
        nama: '',[cite: 1]
        ekspedisi: '',[cite: 1]
        tanggalKirim: ''[cite: 1]
      }
    };
  },
  // Minimal Watcher 2: Memperbarui tanggal rilis secara real-time saat form disentuh[cite: 1]
  watch: {
    'payload.nim'(newVal) {
      if (newVal && !this.payload.tanggalKirim) {
        this.payload.tanggalKirim = this.getFormattedDate();[cite: 1]
      }
    }
  },
  computed: {
    currentPaket() {
      if (this.selectedPaketIndex >= 0) {
        return this.paketList[this.selectedPaketIndex];[cite: 1]
      }
      return null;
    }
  },
  methods: {
    getFormattedDate() {
      const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      const d = new Date();
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;[cite: 1]
    },
    submitDO() {
      // Validasi input[cite: 1]
      if (!this.payload.nim || !this.payload.nama || !this.payload.ekspedisi || this.selectedPaketIndex == -1) {[cite: 1]
        alert('Mohon melengkapi seluruh field data penerbitan dokumen DO!');
        return;
      }

      const finalDO = {
        nim: this.payload.nim,[cite: 1]
        nama: this.payload.nama,[cite: 1]
        ekspedisi: this.payload.ekspedisi,[cite: 1]
        tanggalKirim: this.payload.tanggalKirim,[cite: 1]
        paket: this.currentPaket.kode,[cite: 1]
        total: this.currentPaket.harga,[cite: 1]
        status: 'Sedang Diproses'
      };

      this.$emit('add-do', finalDO);
      
      // Reset Formulir
      this.payload = { nim: '', nama: '', ekspedisi: '', tanggalKirim: '' };
      this.selectedPaketIndex = -1;
      alert('Dokumen Surat Jalan DO Berhasil Diterbitkan!');
    }
  },
  filters: {
    formatCurrency(value) {
      if (!value) return 'Rp 0';
      return 'Rp ' + value.toLocaleString('id-ID');[cite: 1]
    }
  }
});
