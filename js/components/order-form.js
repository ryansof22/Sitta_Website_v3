// order-form.js
Vue.component('order-form', {
    template: '#tpl-order',
    props: ['paket', 'ekspedisi'],
    data() {
        return {
            selectedPaket: null,
            form: { nim: '', nama: '' }
        };
    },
    methods: {
        submitOrder() { alert('Pesanan Berhasil dibuat!'); }
    }
});
