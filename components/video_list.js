import React from "react";
import styles from '../styles/Home.module.css'
import VideoListItem from "./video_list_item";

const VideoList = ({ videos, onVideoSelected }) =>
{
    return (
        <ul className={styles.nobullet}>
            {
                videos.map(video => <VideoListItem key={video.etag} video={video} onVideoSelected={onVideoSelected} />)
            }
        </ul>
    )
}

export default VideoList