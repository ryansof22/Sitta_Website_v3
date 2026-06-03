Vue.component('status-badge', {
    template: '#tpl-badge',
    props: ['qty', 'safety'],
    computed: {
        status() {
            if (this.qty === 0) return { text: 'Kosong', class: 'badge-danger' };
            if (this.qty < this.safety) return { text: 'Menipis', class: 'badge-warning' };
            return { text: 'Aman', class: 'badge-success' };
        }
    }
});
