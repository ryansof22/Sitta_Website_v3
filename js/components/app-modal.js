Vue.component('app-modal', {
    template: '#tpl-modal',
    data() { 
        return { 
            isOpen: false,
            title: '',
            message: '',
            resolve: null
        }; 
    },
    methods: {
        show(title, message) {
            this.title = title;
            this.message = message;
            this.isOpen = true;
            return new Promise((resolve) => {
                this.resolve = resolve;
            });
        },
        confirm() {
            this.isOpen = false;
            if (this.resolve) this.resolve(true);
        },
        close() {
            this.isOpen = false;
            if (this.resolve) this.resolve(false);
        }
    }
});
