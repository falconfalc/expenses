export type ResponseError = {
    errorField: string,
    errorMessages: string,
    errorStatus: string
}

export const handleValidationErrors = (errors: ResponseError[]) => {
    errors.forEach((error) => {
        // const element: HTMLElement | null = selectFieldWithError(error.errorField);

        const element = selectFieldWithError(error.errorField);

        if(element != null) {
            //@ts-ignore
            element.textContent = error.errorMessages;
            element.style.display = 'block';
        }
    });
};

const selectFieldWithError = (field: string) => document.getElementById(field);