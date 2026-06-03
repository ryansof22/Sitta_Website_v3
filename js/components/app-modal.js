Vue.component('app-modal', {
    template: '#tpl-modal',
    data() {
        return {
            isOpen: false,
            title: '',
            message: '',
            onConfirmCallback: null
        };
    },
    methods: {
        open(title, message, onConfirm) {
            this.title = title;
            this.message = message;
            this.onConfirmCallback = onConfirm;
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        },
        confirm() {
            if (this.onConfirmCallback) this.onConfirmCallback();
            this.close();
        }
    }
});
