const ApiService = {
    async fetchBahanAjar() {
        const resp = await fetch('data/dataBahanAjar.json');
        return await resp.json();
    }
};
