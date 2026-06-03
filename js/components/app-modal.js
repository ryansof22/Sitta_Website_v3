Vue.component('app-modal', {
  template: '#tpl-modal',
  data() {
    return {
      isOpen: false,
      title: '',
      message: '',
      resolvePromise: null
    };
  },
  methods: {
    show(title, message) {
      this.title = title;
      this.message = message;
      this.isOpen = true;
      return new Promise((resolve) => {
        this.resolvePromise = resolve;
      });
    },
    close(result) {
      this.isOpen = false;
      if (this.resolvePromise) {
        this.resolvePromise(result);
      }
    }
  }
});
