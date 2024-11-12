
const checkHealth = async function (req, res) {
    const ram = process.memoryUsage().rss / 1024 / 1024;
    const cpu  = process.cpuUsage().user/1000;
    res.status(200).send({
        "cpu": cpu,
        "ram": ram,
        "status": "UP"
    })
}

export default checkHealth;