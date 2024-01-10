import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface LabelProps {
    htmlFor: string;
    labelText: string;
    showHints: boolean;
    iconValid?: IconDefinition;
    iconInvalid?: IconDefinition;
    classNameValid?: string;
    classNameInvalid?: string;
}

export const FormLabel: React.FC<LabelProps> = ({ htmlFor, labelText, iconValid, iconInvalid, classNameValid, classNameInvalid, showHints}) => {
    return (
        <label htmlFor={htmlFor}>
            {labelText}:
            {showHints && (
                <>
                    <FontAwesomeIcon icon={iconValid!} className={classNameValid}/>
                    <FontAwesomeIcon icon={iconInvalid!} className={classNameInvalid}/>
                </>
            )}
        </label>
    );
};
