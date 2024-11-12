import { getAccessToken, getTokenIDTokenKey, getRemainRequest } from "../services/tokensService.js";
import dotenv from 'dotenv';

dotenv.config();

const ekycTokens = async function (req, res) {
    //
    const access_token = JSON.parse(await getAccessToken()).access_token;
    const token_id_key = JSON.parse(await getTokenIDTokenKey(access_token));
    res.status(200).send({
        "token_id": token_id_key.object.uuidProjectServicePlan ,
        "token_key": token_id_key.object.publicKey,
        "access_token": access_token,
        "expireDate": token_id_key.object.expireDate,
        "expires_in": process.env.VNPT_TOKEN_EXPIRE
    })
}

const remainRequest = async function (req, res) {
    //
    const access_token = JSON.parse(await getAccessToken()).access_token;
    const token_id_key = JSON.parse(await getTokenIDTokenKey(access_token));
    const re = await getRemainRequest(access_token,token_id_key.object.uuidProjectServicePlan,token_id_key.object.publicKey)
    res.status(200).send(re)
}


export {ekycTokens,remainRequest};