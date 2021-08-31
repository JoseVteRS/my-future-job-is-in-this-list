import Link from 'next/link';
import React, { useState } from 'react';

const SearchJobInput = ({ showMessage }) => {
  const [valueInputSearch, setValueInputSearch] = useState('');
  return (
    <div className="text-center text-lg p-3">
      {showMessage ? (
        <>
          <p>No hay ningún trabajo guardado</p>
          <p>Empieza a buscar un trabajo 💪🏽</p>
        </>
      ) : (
        <></>
      )}

      <div className="grid grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Buscar en infojobs"
          className="w-full shadow rounded col-span-2 p-2"
          onChange={(event) => setValueInputSearch(event.target.value)}
        />
        <Link
          href={`https://www.infojobs.net/jobsearch/search-results/list.xhtml?keyword=${valueInputSearch}`}
        >
          <a
            target="_blank"
            className="col-span-1 bg-blue-500 hover:bg-blue-700 text-gray-50 rounded shadow flex items-center justify-center"
          >
            Infojobs
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SearchJobInput;
