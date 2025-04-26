import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const VideoTimeline = () => {
    const { videoURL } = useSelector((state) => state.video);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [frames, setFrames] = useState([]);

    useEffect(() => {
        if (!videoURL) return;

        const captureFrames = async () => {
            const frameCount = 5; // Number of frames to capture
            const interval = 1; // Interval in seconds
            const captured = [];

            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            video.onloadedmetadata = async () => {
                const duration = video.duration;
                const width = 160;
                const height = 90;

                video.width = width;
                video.height = height;
                canvas.width = width;
                canvas.height = height;

                for (let i = 0; i < frameCount; i++) {
                    const time = i * interval;
                    if (time >= duration) break;

                    await seekToTime(video, time);
                    ctx.drawImage(video, 0, 0, width, height);
                    const image = canvas.toDataURL("image/png");
                    captured.push(image);
                }

                setFrames(captured);
            };
        };

        const seekToTime = (video, time) => {
            return new Promise((resolve) => {
                const onSeeked = () => {
                    video.removeEventListener("seeked", onSeeked);
                    resolve();
                };
                video.addEventListener("seeked", onSeeked);
                video.currentTime = time;
            });
        };

        captureFrames();
    }, [videoURL]);

    return (
        <div className="mt-6 p-4 border rounded shadow-md">
            <h2 className="text-lg font-bold mb-2">Video Timeline (Frames)</h2>

            <div className="flex gap-2 overflow-x-auto">
                {frames.map((frame, index) => (
                    <img
                        key={index}
                        src={frame}
                        alt={`frame-${index}`}
                        className="w-40 h-auto border rounded"
                    />
                ))}
            </div>

            {/* Hidden video & canvas for frame extraction */}
            <video ref={videoRef} src={videoURL} className="hidden" />
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

export default VideoTimeline;
