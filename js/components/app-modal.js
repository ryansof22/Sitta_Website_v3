Vue.component('app-modal', {
    template: '#tpl-modal',
    data() { return { visible: false, message: '' }; },
    methods: {
        // Ganti show(msg) menjadi:
        open(title, message, onConfirm) {
        this.title = title;
        this.message = message;
        this.onConfirmCallback = onConfirm;
        this.isOpen = true; // Pastikan data di app-modal.js memiliki property 'isOpen'
        }
    }
});
