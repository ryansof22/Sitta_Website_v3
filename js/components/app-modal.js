Vue.component('app-modal', {
    template: '#tpl-modal',
    data() { 
        return { 
            isOpen: false, // Gunakan isOpen agar sesuai dengan template
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
        confirm() {
            if (this.onConfirmCallback) this.onConfirmCallback();
            this.isOpen = false;
        },
        close() {
            this.isOpen = false;
        }
    }
});
