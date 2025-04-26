import React from 'react'
import VideoUpload from '../components/Upload/VideoUpload'
import VideoTimeline from '../components/Timeline/VideoTimeline'
import { useSelector } from "react-redux";

const EditorPage = () => {
    const { videoURL } = useSelector((state) => state.video);
    return (
        <div className="h-[100vh] bg-[#222]">
            <header className='h-[60%] border border-gray-300'>
                <VideoUpload />
            </header>
            <footer className='h-[40%] border border-gray-300'>
                {videoURL && <VideoTimeline />}
            </footer>
        </div>
    )
}

export default EditorPage
