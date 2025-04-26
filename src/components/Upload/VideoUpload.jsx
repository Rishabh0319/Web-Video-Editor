import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addVideo, removeVideo, setUploadProgress } from '../../redux/slices/VideoSlice';

const VideoUpload = () => {
    const dispatch = useDispatch();
    const { videoURL, uploadProgress } = useSelector((state) => state.video);
    const fileInputRef = useRef();
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = (file) => {
        if (!file) return;

        dispatch(setUploadProgress(0));

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            dispatch(setUploadProgress(progress));

            if (progress >= 100) {
                clearInterval(interval);

                setTimeout(() => {
                    const url = URL.createObjectURL(file);
                    dispatch(addVideo({ videoURL: url }));
                }, 200);
            }
        }, 100);
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleRemove = () => {
        dispatch(removeVideo());
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="h-full flex flex-col justify-center items-center">
            {!videoURL && (
                <div
                    className={`relative border-2 border-dashed ${isDragging ? "border-blue-400 bg-blue-50" : "border-gray-200"
                        } h-[40%] w-[30%] rounded-xl transition`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleUpload}
                        ref={fileInputRef}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white !px-4 !py-2 cursor-pointer rounded shadow hover:bg-blue-600 transition"
                    >
                        Import Video File
                    </button>
                    <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[100%] text-white">
                        OR drop your video file here
                    </h2>
                </div>
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-[50%] bg-gray-200 rounded !mt-5 !h-2 !mb-2">
                    <div
                        className="bg-blue-500 h-2 rounded transition-all duration-100 ease-in-out"
                        style={{ width: `${uploadProgress}%` }}
                    ></div>
                </div>
            )}

            {videoURL && (
                <div className="flex flex-col justify-center items-center">
                    <video src={videoURL} controls width="45%" height="40%" className="!mt-2" />
                    <button
                        className="!mt-1 !px-1 cursor-pointer bg-red-500 text-white rounded"
                        onClick={handleRemove}
                    >
                        Remove Video
                    </button>
                </div>
            )}
        </div>
    );
};

export default VideoUpload;
