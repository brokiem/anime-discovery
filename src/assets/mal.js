const API_URL = "https://rose-plain-crayfish.cyclic.app";

export function getAnimeDetails(title) {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API_URL}/v1/anime/details/${title}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    resolve(result.message)
                } else {
                    reject(result.error)
                }
            })
            .catch(error => reject(error));
    });
}