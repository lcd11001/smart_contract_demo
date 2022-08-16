import React, { useEffect, useState } from "react"
import styles from '../styles/Home.module.css'

const SearchBar = ({ defaultValue, onSearchChanged }) =>
{
    const [text, SetText] = useState('')

    const onInputChanged = (e) =>
    {
        SetText(e.target.value)
    }

    const onInputSubmit = (e) =>
    {
        if (e.key === 'Enter')
        {
            onSearchChanged && onSearchChanged(e.target.value)
        }
    }

    useEffect(() =>
    {
        SetText(defaultValue)
    }, [defaultValue])

    return (
        <div className={styles.searchBar}>
            <input
                onChange={onInputChanged}
                onKeyDown={onInputSubmit}
                value={text}
            />
        </div>
    )
}

export default SearchBar