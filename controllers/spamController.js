
const checkSpam = async function (req, res) {
    const number = req.query.number;
    const isSpam = Math.random() >= 0.5;
    res.status(200).send({
        "isSpam": isSpam,
        "message": `${number}: This number is known for ${isSpam ? 'spam' : 'not spam'}.`
    })
}

module.exports = { checkSpam };