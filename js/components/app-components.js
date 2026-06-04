// 1. Status Badge Component
Vue.component('status-badge', {
  template: '#tpl-badge',
  props: ['qty', 'safety'],
  computed: {
    badgeText() {
      if (this.qty === 0) return 'Kosong';
      if (this.qty <= this.safety) return 'Menipis';
      return 'Aman';
    },
    badgeClass() {
      if (this.qty === 0) return 'badge-danger';
      if (this.qty <= this.safety) return 'badge-danger';
      return 'badge-safe';
    }
  }
});

// 2. App Modal Component (Promise Based)
Vue.component('app-modal', {
  template: '#tpl-modal',
  data() { return { isOpen: false, title: '', message: '', resolve: null }; },
  methods: {
    show(t, m) {
      this.title = t; this.message = m; this.isOpen = true;
      return new Promise(res => { this.resolve = res; });
    },
    close(val) { this.isOpen = false; if(this.resolve) this.resolve(val); }
  }
});

// 3. Order Form Component
Vue.component('order-form', {
  template: '#tpl-order',
  props: ['paketList', 'ekspedisiList'],
  data() {
    return {
      selectedPaketIndex: -1,
      payload: { nim: '', nama: '', ekspedisi: '', tanggalKirim: '' }
    };
  },
  watch: {
    'payload.nim'(newVal) {
      if (newVal && !this.payload.tanggalKirim) {
        const d = new Date();
        this.payload.tanggalKirim = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
      }
    }
  },
  methods: {
    submitDO() {
      if (!this.payload.nim || !this.payload.nama || this.selectedPaketIndex == -1) {
        alert('Mohon lengkapi data pemesanan!'); return;
      }
      const paket = this.paketList[this.selectedPaketIndex];
      this.$emit('add-do', { ...this.payload, paket: paket.kode, total: paket.harga, status: 'Diproses' });
      this.payload = { nim: '', nama: '', ekspedisi: '', tanggalKirim: '' };
      this.selectedPaketIndex = -1;
      alert('DO Berhasil Diterbitkan!');
    }
  }
});

// 4. DO Tracking Component
Vue.component('do-tracking', {
  template: '#tpl-tracking',
  props: ['trackingList'],
  data() { return { searchQuery: '', activeDO: null, newStatusText: '' }; },
  methods: {
    search() {
      const q = this.searchQuery.trim().toLowerCase();
      const found = this.trackingList.find(i => i.id.toLowerCase() === q || i.nim.toLowerCase() === q);
      this.activeDO = found || null;
      if(!found) alert('Data Delivery Order tidak ditemukan');
    },
    clearSearch() { this.searchQuery = ''; this.activeDO = null; },
    appendProgress() {
      if(!this.newStatusText) return;
      this.activeDO.perjalanan.push({ 
        waktu: new Date().toLocaleString('id-ID'), 
        keterangan: this.newStatusText 
      });
      this.activeDO.status = this.newStatusText;
      this.newStatusText = '';
    }
  }
});

// 5. Stock Table Component
Vue.component('ba-stock-table', {
  template: '#tpl-stock',
  props: ['items', 'upbjjList', 'kategoriList'],
  data() {
    return {
      isEditMode: false,
      sortKey: 'judul',
      filters: { upbjj: '', kategori: '', warningStock: false },
      form: { kode: '', judul: '', upbjj: '', kategori: '', harga: 0, qty: 0, safety: 0 }
    };
  },
  watch: {
    'filters.upbjj'(newVal) { if (!newVal) this.filters.kategori = ''; }
  },
  computed: {
    filteredItems() {
      let res = this.items.filter(i => {
        return (!this.filters.upbjj || i.upbjj === this.filters.upbjj) &&
               (!this.filters.kategori || i.kategori === this.filters.kategori) &&
               (!this.filters.warningStock || i.qty <= i.safety);
      });
      return res.sort((a, b) => a[this.sortKey] > b[this.sortKey] ? 1 : -1);
    }
  },
  methods: {
    save() {
      this.$emit(this.isEditMode ? 'update-stock' : 'create-stock', { ...this.form });
      this.isEditMode = false;
      this.resetForm();
    },
    edit(item) { this.isEditMode = true; this.form = { ...item }; },
    remove(kode) {
      this.$root.$refs.modal.show('Konfirmasi Hapus', `Hapus data kode ${kode}?`).then(ok => {
        if(ok) this.$emit('delete-stock', kode);
      });
    },
    resetForm() { this.form = { kode: '', judul: '', upbjj: '', kategori: '', harga: 0, qty: 0, safety: 0 }; }
  },
  filters: {
    formatCurrency(v) { return 'Rp ' + v.toLocaleString('id-ID'); }
  }
});
