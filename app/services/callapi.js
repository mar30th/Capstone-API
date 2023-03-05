function Callapi(){
    this.fetchLishData = () => {
        return axios({
            url: "https://63df6ff88b24964ae0edc54c.mockapi.io/api/API-Capstone",
            method: "GET",
        });
    };
    this.deleteProduct = (id) => {
        return axios({
            url: `https://63df6ff88b24964ae0edc54c.mockapi.io/api/API-Capstone/${id}`,
            method: "DELETE",
        });
    };
    this.addProduct = (product) => {
        return axios({
            url: "https://63df6ff88b24964ae0edc54c.mockapi.io/api/API-Capstone",
            method: `POST`,
            data: product,
        })
    };
    this.getProductByID = (id) => {
        return axios({
            url: `https://63df6ff88b24964ae0edc54c.mockapi.io/api/API-Capstone/${id}`,
            method: `GET`,
        })
    };
    this.putProductByID = (product) => {
        return axios({
            url: `https://63df6ff88b24964ae0edc54c.mockapi.io/api/API-Capstone/${product.id}`,
            method: `PUT`,
            data: product,
        })
    }
};