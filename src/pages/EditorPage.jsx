import React from 'react'
import VideoUpload from '../components/Upload/VideoUpload'

const EditorPage = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Video Editor</h1>
            <VideoUpload />
        </div>
    )
}

export default EditorPage
