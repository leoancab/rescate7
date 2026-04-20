import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import BackButton from "../components/BackButton"

const APP_ID = "5eedd672de6a43abbc40a4d5fd9ccd02";

export default function ChatRoom() {
    const { roomId } = useParams();
    const [token, setToken] = useState(null);
    const [hasVideo, setHasVideo] = useState(true);

    const localRef = useRef();
    const remoteRef = useRef();

    useEffect(() => {
        fetch(`https://fragility-culinary-charter.ngrok-free.dev/agora/token?roomId=${roomId}`)
            .then(res => res.json())
            .then(data => setToken(data.token));
    }, [roomId]);

    useEffect(() => {
        if (!token) return;

        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

        let localTracks = [];

        const init = async () => {
            await client.join(APP_ID, roomId, token, null);

            try {
                // 🎥 intenta video + audio
                localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

                // mostrar video local
                localTracks[1].play(localRef.current);

                setHasVideo(true);

            } catch (error) {
                console.warn("Sin cámara, usando solo audio");

                const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                localTracks = [audioTrack];

                setHasVideo(false);
            }

            await client.publish(localTracks);

            // 👂 escuchar usuarios remotos
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);

                if (mediaType === "video") {
                    user.videoTrack.play(remoteRef.current);
                }

                if (mediaType === "audio") {
                    user.audioTrack.play();
                }
            });
        };

        init();

        return () => {
            localTracks.forEach(track => track.close());
            client.leave();
        };
    }, [token, roomId]);

    if (!token) return <p>Conectando...</p>;

    return (
        <div style={{ gap: "1vh", display: "flex", flexDirection: "column" }}>
            <BackButton />
            <div
                ref={hasVideo ? localRef : null}
                style={{
                    width: "100%",
                    height: "45vh",
                    backgroundColor: hasVideo ? "transparent" : "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white"
                }}
            >
                {!hasVideo && <p>🎙️ Solo audio</p>}
            </div>

            {/* 👥 VIDEO REMOTO */}
            <div
                ref={remoteRef}
                style={{
                    width: "100%",
                    height: "45vh",
                    backgroundColor: "black"
                }}
            />

        </div>
    );
}