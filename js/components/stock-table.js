Vue.component('ba-stock-table', {
  template: '#tpl-stock',
  props: {
    items: { type: Array, required: true },
    upbjjList: { type: Array, required: true },
    kategoriList: { type: Array, required: true }
  },
  data() {
    return {
      hoverCode: '',
      sortKey: 'judul',[cite: 1]
      isEditMode: false,
      filters: {
        upbjj: '',[cite: 1]
        kategori: '',[cite: 1]
        warningStock: false[cite: 1]
      },
      form: {
        kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: 0, qty: 0, safety: 0, catatanHTML: ''
      }
    };
  },
  // Minimal Watcher 1: Mereset filter kategori otomatis jika induk wilayah berubah
  watch: {
    'filters.upbjj'(newVal) {
      if (!newVal) {
        this.filters.kategori = '';
      }
    }
  },
  computed: {
    filteredAndSortedItems() {
      let result = [...this.items];[cite: 1]

      // 1. Eksekusi filter wilayah
      if (this.filters.upbjj) {
        result = result.filter(i => i.upbjj === this.filters.upbjj);[cite: 1]
      }
      // 2. Eksekusi filter kategori
      if (this.filters.kategori) {
        result = result.filter(i => i.kategori === this.filters.kategori);[cite: 1]
      }
      // 3. Eksekusi filter kondisi kritis / menipis
      if (this.filters.warningStock) {
        result = result.filter(i => i.qty < i.safety || i.qty === 0);[cite: 1]
      }

      // 4. Eksekusi Pengurutan data (Sorting)
      result.sort((a, b) => {
        let valA = a[this.sortKey];
        let valB = b[this.sortKey];
        if (typeof valA === 'string') {
          return valA.localeCompare(valB);
        }
        return valA - valB;
      });

      return result;
    }
  },
  methods: {
    resetFilters() {
      this.filters.upbjj = '';[cite: 1]
      this.filters.kategori = '';[cite: 1]
      this.filters.warningStock = false;[cite: 1]
    },
    triggerEdit(item) {
      this.isEditMode = true;
      this.form = { ...item };
    },
    cancelEdit() {
      this.isEditMode = false;
      this.clearForm();
    },
    triggerDelete(kode) {
      // Memanggil modal konfirmasi via root instance
      this.$root.$refs.modal.show(
        'Konfirmasi Penghapusan',
        `Apakah Anda yakin akan menghapus data bahan ajar dengan kode: ${kode}?`
      ).then((confirmed) => {
        if (confirmed) {
          this.$emit('delete-stock', kode);
        }
      });
    },
    saveData() {
      // Validasi Entri Data Dasar
      if (!this.form.kode || !this.form.judul || !this.form.upbjj) {
        alert('Mohon lengkapi kode, judul buku, dan wilayah UPBJJ!');
        return;
      }
      
      if (this.isEditMode) {
        this.$emit('update-stock', { ...this.form });
        this.isEditMode = false;
      } else {
        // Beri catatan default jika kosong saat membuat data baru
        this.form.catatanHTML = `Data entri baru sistem tanggal: ${new Date().toLocaleDateString('id-ID')}`;
        this.$emit('create-stock', { ...this.form });
      }
      this.clearForm();
    },
    clearForm() {
      this.form = { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: 0, qty: 0, safety: 0, catatanHTML: '' };
    }
  },
  filters: {
    formatCurrency(value) {
      if (!value) return 'Rp 0';
      return 'Rp ' + value.toLocaleString('id-ID');[cite: 1]
    },
    formatSatuan(value) {
      return (value || 0) + ' buah';[cite: 1]
    }
  }
});
