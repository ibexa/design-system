import React, { useContext } from 'react';

import { InputTextInput, InputTextInputSize } from '@ids-components/InputText';
import { TranslatorContext } from '@ids-context/Translator';

import { SearchProps } from './Search.types';

export const Search = ({ isVisible, setSearchTerm, searchRef, searchTerm, hasSearchIcon = false }: SearchProps) => {
    const Translator = useContext(TranslatorContext);

    if (!isVisible) {
        return null;
    }

    const placeholderText = Translator.trans(/*@Desc("Search...")*/ 'ids.dropdown.search.placeholder');

    return (
        <div className="ids-dropdown__search">
            <InputTextInput
                hasSearchAction={hasSearchIcon}
                name="dropdown-search"
                onChange={setSearchTerm}
                placeholder={placeholderText}
                ref={searchRef}
                searchButtonType="button"
                size={InputTextInputSize.Small}
                value={searchTerm}
            />
        </div>
    );
};
