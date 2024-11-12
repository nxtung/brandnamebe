import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

async function getAccessToken() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ 
            "username": process.env.VNPT_USERNAME, 
            "password": process.env.VNPT_PASSWORD, 
            "client_id": "8_hour", 
            "grant_type": "password", 
            "client_secret": "password", 
            "channelCode": "eKYC", 
            "source": "WEB"
        });

        const options = {
            hostname:  process.env.VNPT_HOST,
            path: process.env.VNPT_TOKEN_ENDPOINT,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = https.request(options, (res) => {
            let responseBody = '';

            res.on('data', (chunk) => {
                responseBody += chunk;
            });

            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(responseBody);
                } else {
                    reject(new Error(`Request failed. Status Code: ${res.statusCode}, Message: ${responseBody}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        // Write data to request body
        req.write(data);
        req.end();
    });
}

async function getTokenIDTokenKey(access_token) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({"channelCode":"eKYC"});

        const options = {
            hostname:  process.env.VNPT_HOST,
            path: process.env.VNPT_TOKENID_TOKENKEY_ENDPOINT,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json',
            }
        };

        const req = https.request(options, (res) => {
            let responseBody = '';

            res.on('data', (chunk) => {
                responseBody += chunk;
            });

            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(responseBody);
                } else {
                    reject(new Error(`Request failed. Status Code: ${res.statusCode}, Message: ${responseBody}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        // Write data to request body
        req.write(data);
        req.end();
    });
}

async function getRemainRequest(access_token, token_id, token_key) {
    return new Promise((resolve, reject) => {

        const options = {
            hostname:  process.env.VNPT_HOST,
            path: process.env.VNPT_REMAIN_REQUEST_ENDPOINT + '?tokenId=' + token_id,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json; charset=utf8',
                'Token-Id': token_id,
                'Token-Key': token_key
            }
        };

        const req = https.request(options, (res) => {
            let responseBody = '';

            res.on('data', (chunk) => {
                responseBody += chunk;
            });

            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(responseBody);
                } else {
                    reject(new Error(`Request failed. Status Code: ${res.statusCode}, Message: ${responseBody}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}


export { getAccessToken, getTokenIDTokenKey, getRemainRequest }