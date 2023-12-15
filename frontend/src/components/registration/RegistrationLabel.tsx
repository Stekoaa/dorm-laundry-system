import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface LabelProps {
    htmlFor: string;
    labelText: string;
    iconValid: IconDefinition;
    iconInvalid: IconDefinition;
    classNameValid: string;
    classNameInvalid: string;
}

const RegistrationLabel: React.FC<LabelProps> = ({ htmlFor, labelText, iconValid, iconInvalid, classNameValid, classNameInvalid }) => {
    return (
        <label htmlFor={htmlFor}>
            {labelText}:
            <FontAwesomeIcon icon={iconValid} className={classNameValid} />
            <FontAwesomeIcon icon={iconInvalid} className={classNameInvalid} />
        </label>
    );
};

export default RegistrationLabel;