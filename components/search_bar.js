import React, { useState } from "react"

const SearchBar = () =>
{
    const [text, SetText] = useState('')

    const onInputChanged = (e) =>
    {
        SetText(e.target.value)
    }

    return (
        <div>
            <input
                onChange={onInputChanged}
                value={text}
            />
        </div>
    )
}

export default SearchBar