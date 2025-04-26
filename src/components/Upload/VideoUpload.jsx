import React, { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addVideo, removeVideo, setUploadProgress } from '../../redux/slices/VideoSlice';

const VideoUpload = () => {
    const dispatch = useDispatch();
    const { videoURL, uploadProgress } = useSelector((state) => state.video);
    const fileInputRef = useRef();

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Reset progress
        dispatch(setUploadProgress(0));

        // Simulate upload
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

    const handleRemove = () => {
        dispatch(removeVideo());

        // Reset file input field
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="p-4 border rounded shadow-md">
            <input
                type="file"
                accept="video/*"
                onChange={handleUpload}
                className="mb-4"
                ref={fileInputRef}
            />


            {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full bg-gray-200 rounded h-2 mb-2">
                    <div
                        className="bg-blue-500 h-2 rounded transition-all duration-100 ease-in-out"
                        style={{ width: `${uploadProgress}%` }}
                    ></div>
                </div>
            )}


            {videoURL && (
                <div className="mt-4">
                    <video src={videoURL} controls width="400" />
                    <button
                        className="mt-2 px-4 py-1 bg-red-500 text-white rounded"
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
