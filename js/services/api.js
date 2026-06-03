// js/services/api.js
const ApiService = {
    async fetchData() {
        try {
            // Membaca dummy data dari folder data/
            const response = await fetch('data/dataBahanAjar.json');
            if (!response.ok) {
                throw new Error('Gagal memuat dataBahanAjar.json');
            }
            return await response.json();
        } catch (error) {
            console.error("API Service Error:", error);
            return null;
        }
    }
};
