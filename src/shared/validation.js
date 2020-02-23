export const checkValidity = (value, rules) => {
    rules = rules ?? {required: true};

    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '';
    }

    if (rules.minLength && isValid) {
        isValid = value.length >= rules.minLength;
    }

    if (rules.maxLength && isValid) {
        isValid = value.length <= rules.maxLength;
    }

    if (rules.isEmail && isValid) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value);
    }

    if (rules.isNumeric && isValid) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value);
    }

    return isValid;
}
