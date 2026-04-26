import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import BackButton from "../components/BackButton"
import { Copy, CopyCheck } from "lucide-react";
import { toast } from "react-toastify"

const APP_ID = "5eedd672de6a43abbc40a4d5fd9ccd02";

export default function ChatRoom() {
    const { roomId } = useParams();
    const [token, setToken] = useState(null);
    const [hasVideo, setHasVideo] = useState(true);

    const localRef = useRef();
    const remoteRef = useRef();

    const [copiado, setCopiado] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/agora/token?roomId=${roomId}`)
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
                localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

                localTracks[1].play(localRef.current);

                setHasVideo(true);

            } catch (error) {
                console.warn("Sin cámara, usando solo audio");

                const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                localTracks = [audioTrack];

                setHasVideo(false);
            }

            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);

                if (mediaType === "video") {
                    user.videoTrack.play(remoteRef.current);
                }

                if (mediaType === "audio") {
                    user.audioTrack.play();
                }
            });

            await client.publish(localTracks);

            client.remoteUsers.forEach(async (user) => {
                if (user.hasVideo) {
                    await client.subscribe(user, "video");
                    user.videoTrack.play(remoteRef.current);
                }

                if (user.hasAudio) {
                    await client.subscribe(user, "audio");
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

    const copiar = async () => {
        try {
            await navigator.clipboard.writeText(roomId);
            setCopiado(true);
            toast.success("Código de reunión copiado")
            setTimeout(() => setCopiado(false), 2000);
        } catch (err) {
            console.error("Error al copiar:", err);
        }
    };

    return (
        <div style={{ gap: "1vh", display: "flex", flexDirection: "column", background: "linear-gradient(to bottom, #072A60, #5181CA)" }}>
            <BackButton />
            Comparte este ID:
            <button onClick={copiar} style={{ display: "flex", justifyContent: "center", gap: "1%" }}>
                {copiado ? (
                    <>
                        {roomId} <CopyCheck />
                    </>
                ) : (
                    <>
                        {roomId} <Copy />
                    </>
                )}
            </button>
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