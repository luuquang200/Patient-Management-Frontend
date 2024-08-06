export const validateContactInfo = (type, value) => {
    if (type === 'Email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Invalid email format';
    }
    if (type === 'Phone') {
        const phoneRegex = /^\d{10}$/; 
        return phoneRegex.test(value) ? '' : 'Invalid phone number format (10 digits)';
    }
    return '';
};
