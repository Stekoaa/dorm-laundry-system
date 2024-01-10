import React, {FormEvent, useRef} from "react";

interface Field {
    id: string;
    type: string;
    value: string;
    valid: boolean;
    setFocus: (focus: boolean) => void;
    setValue: (value: string) => void;
    required: boolean;
    label?: React.ReactElement;
    hint?: React.ReactElement;
    //inputRef: React.RefObject<HTMLInputElement>;
}

interface FormProps {
    fields: Field[],
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    success: boolean;
    errorMessage: string;
    footer?: React.ReactElement;
    onSuccessSection: React.ReactElement;
}

export const Form: React.FC<FormProps> = ({ fields, onSubmit, success, errorMessage, footer, onSuccessSection }) => {
    const formInvalid = fields.some(field => !field.valid);
    const errRef = useRef<HTMLParagraphElement>(null);

    return (
        <>
            {success ? (
                <section>
                    {onSuccessSection}
                </section>
                ) : (
                <section>
                    <p ref={errRef} className={errorMessage ? 'errmsg' : 'offscreen'} aria-live='assertive'>
                        {errorMessage}
                    </p>
                    <form onSubmit={onSubmit}>
                        {fields.map(field => (
                            <React.Fragment key={field.id}>
                                {field.label}
                                    <input
                                        id={field.id}
                                        value={field.value as string}
                                        onFocus={() => field.setFocus(true)}
                                        onBlur={() => field.setFocus(false)}
                                        type={field.type}
                                        onChange={(e) => field.setValue(e.target.value)}
                                        required={field.required}
                                        aria-invalid={!field.valid}
                                    />
                                {field.hint}
                            </React.Fragment>
                        ))}
                        <button disabled={formInvalid}>Submit</button>
                    </form>
                    {footer}
                </section>
                )}
        </>
    );
};
