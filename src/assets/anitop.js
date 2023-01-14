const API_URL = "https://anitop-brokiem.vercel.app/api";

export function getTopAnime() {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API_URL}/v1/top-anime`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.code === 200) {
                    result.data.length = Math.min(result.data.length, 40);
                    resolve(result.data);
                } else {
                    reject(result.error);
                }
            })
            .catch(error => reject(error));
    });
}