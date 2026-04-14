const express = require("express");
const router = express.Router();

const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

router.get("/token", (req, res) => {
    const { roomId } = req.query;

    if (!roomId) {
        return res.status(400).json({ error: "roomId requerido" });
    }

    const APP_ID = process.env.AGORA_APP_ID;
    const APP_CERT = process.env.AGORA_APP_CERT;

    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERT,
        roomId,
        0,
        role,
        privilegeExpireTime
    );

    res.json({ token });
});

module.exports = router;