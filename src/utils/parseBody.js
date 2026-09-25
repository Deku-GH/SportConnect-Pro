function parseBody(req) {
    return new Promise((resolve, reject) => {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {

            try {
                const params = new URLSearchParams(body);

                const data = {};

                for (const [key, value] of params.entries()) {
                    data[key] = value;
                }

                resolve(data);

            } catch (error) {
                reject(error);
            }

        });

        req.on('error', error => {
            reject(error);
        });
    });
}
module.exports=parseBody;