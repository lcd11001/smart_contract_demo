import React from "react";
import styles from '../styles/Home.module.css'
import VideoListItem from "./video_list_item";

const VideoList = ({ videos }) =>
{
    return (
        <ul className={[styles.container, styles.nobullet].join(' ')}>
            {
                videos.map(video => <VideoListItem key={video.etag} video={video} />)
            }
        </ul>
    )
}

export default VideoList