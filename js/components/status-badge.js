Vue.component('status-badge', {
    template: '#tpl-badge',
    props: {
        qty: { type: Number, required: true },
        safety: { type: Number, required: true }
    },
    computed: {
        badgeClass() {
            if (this.qty === 0) return 'badge-danger'; // Merah
            if (this.qty < this.safety) return 'badge-warning'; // Oranye
            return 'badge-success'; // Hijau
        },
        badgeText() {
            if (this.qty === 0) return 'Kosong ❌';
            if (this.qty < this.safety) return 'Menipis ⚠️';
            return 'Aman ✔️';
        }
    }
});
