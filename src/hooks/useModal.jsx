import {useState} from 'react';

export default function useModal() {
    const [selected, setSelected] = useState(null);
    const open = (movie) => setSelected(movie);
    const close = () => setSelected(null);
    return { selected, open, close };
}