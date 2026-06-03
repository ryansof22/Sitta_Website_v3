Vue.component('app-modal', {
    template: '#tpl-modal',
    data() { return { visible: false, message: '' }; },
    methods: {
        show(msg) { this.message = msg; this.visible = true; }
    }
});
