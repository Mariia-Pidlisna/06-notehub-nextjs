'use client'

import css from "./SearchBox.module.css";

interface SearchBoxProps {
    value: string,
    onSearch: (event: string) => void,
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
    }

return <input value={value} onChange={handleChange}
    className={css.input}
    type="text"
    placeholder="Search notes"
/>
}