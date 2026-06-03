Vue.component('do-tracking', {
  template: '#tpl-tracking',
  props: {
    trackingList: { type: Array, required: true }
  },
  data() {
    return {
      searchQuery: '',
      activeDO: null,
      newStatusText: ''
    };
  },
  methods: {
    search() {
      const q = this.searchQuery.trim().toLowerCase();[cite: 1]
      if (!q) return;

      // Cari berdasarkan id DO atau NIM[cite: 1]
      const found = this.trackingList.find(item => 
        item.id.toLowerCase() === q || item.nim.toLowerCase() === q
      );

      if (found) {
        this.activeDO = found;
      } else {
        alert('Data Delivery Order tidak ditemukan!');
        this.activeDO = null;
      }
    },
    clearSearch() {
      this.searchQuery = '';[cite: 1]
      this.activeDO = null;[cite: 1]
    },
    appendProgress() {
      if (!this.newStatusText.trim()) {[cite: 1]
        alert('Isi teks progress perjalanan tidak boleh kosong!');
        return;
      }

      // Generate local time stamp ISO[cite: 1]
      const now = new Date();
      const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;[cite: 1]

      this.activeDO.perjalanan.push({
        waktu: timeStr,[cite: 1]
        keterangan: this.newStatusText.trim()[cite: 1]
      });
      
      this.activeDO.status = this.newStatusText.trim();
      this.newStatusText = '';
    }
  },
  filters: {
    formatCurrency(value) {
      if (!value) return 'Rp 0';
      return 'Rp ' + value.toLocaleString('id-ID');
    }
  }
});
