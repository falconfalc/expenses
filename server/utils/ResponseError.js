//@ts-check
class ResponseError {
    constructor(errorStatus, errorField, errorMessages) {
        this.errorStatus = errorStatus;
        this.errorField = errorField;
        this.errorMessages = errorMessages;
    }

    addErrorMessage(newErrorMessage) { this.errorMessages = [...this.errorMessages, newErrorMessage]; }
    clearErrorMessages() { this.errorMessages = []; }
};

export default ResponseError;