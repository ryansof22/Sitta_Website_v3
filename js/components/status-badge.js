Vue.component('status-badge', {
  template: '#tpl-badge',
  props: {
    qty: { type: Number, required: true },
    safety: { type: Number, required: true }
  },
  computed: {
    badgeText() {
      if (this.qty === 0) return 'Kosong';[cite: 1]
      if (this.qty < this.safety) return 'Menipis';[cite: 1]
      return 'Aman';[cite: 1]
    },
    badgeClass() {
      if (this.qty === 0) return 'badge-danger';
      if (this.qty < this.safety) return 'badge-warning';
      return 'badge-safe';
    }
  },
  // Injeksi CSS dinamis lewat lifecycle hooks demi performa pewarnaan badge yang rapi
  mounted() {
    if (!document.getElementById('badge-dynamic-css')) {
      const style = document.createElement('style');
      style.id = 'badge-dynamic-css';
      style.innerHTML = `
        .badge-safe { background-color: #2ecc71; }
        .badge-warning { background-color: #e67e22; }
        .badge-danger { background-color: #e74c3c; }
      `;
      document.head.appendChild(style);
    }
  }
});
