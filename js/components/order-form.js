Vue.component('order-form', {
    template: '#tpl-order',
    props: {
        paket: { type: Array, required: true },
        ekspedisi: { type: Array, required: true }
    }
});
