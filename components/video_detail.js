import React from "react";
import styles from '../styles/Home.module.css'
import { decode } from 'html-entities'

const VideoDetail = ({ video }) =>
{
    if (!video) 
    {
        return (
            <div>no video selected</div>
        )
    }
    const {
        id: {
            videoId
        },
        snippet: {
            title,
            description
        }
    } = video

    // const videoUrl = `https://www.youtube-nocookie.com/embed/${videoId}`
    const videoUrl = `https://www.youtube.com/embed/${videoId}`
    
    return (
        <div className={styles.videoDetail}>
            <div className={styles.reponsive16x9}>
                <iframe className={styles.responsiveItem} src={videoUrl} ></iframe>
            </div>
            <div className={styles.details}>
                <div>{decode(title)}</div>
                <div>{decode(description)}</div>
            </div>
        </div>
    )
}

export default VideoDetail