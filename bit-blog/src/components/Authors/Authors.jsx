import React, { useEffect, useState } from 'react';
import {getAuthors} from '../../services/services';
import { Author } from '../Author/Author';

import './Authors.css'

export const Authors = () => {

    let [authors, setAuthors] = useState([]);

    useEffect(() => {
        getAuthors()
            .then(response => setAuthors(response))
    }, [])
    return (
        <div>
            <h5>AUTHORS ({authors.length})</h5>
            <div>
                {authors.map((author, index) => <Author author={author} key={index} />)}
            </div>
        </div>
    )
}
