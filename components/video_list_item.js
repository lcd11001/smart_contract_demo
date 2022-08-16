import React from "react";
import { decode } from 'html-entities'

import styles from '../styles/Home.module.css'

const VideoListItem = ({ video, onVideoSelected }) =>
{
    const {
        title,
        thumbnails: {
            default: {
                url,
                width,
                height
            }
        }
    } = video.snippet

    return (
        <li className={styles.card} onClick={() => onVideoSelected(video)}>
            <div className={styles.media}>
                <div className={styles.mediaLeft}>
                    <img className={styles.mediaObject} src={url} width={width} height={height} />
                </div>

                <div className={styles.mediaBody}>
                    <div className={styles.mediaHeading}>
                        {decode(title)}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default VideoListItem