Vue.component('ba-stock-table', {
    template: '#tpl-stock',
    props: {
        items: { type: Array, required: true },
        upbjjList: { type: Array, required: true },
        kategoriList: { type: Array, required: true }
    }
});
