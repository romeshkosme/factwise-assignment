export const calculateAge = (dob) => {
    try {
        const currentDate = new Date();
        const dobDate = new Date(dob);
        let age;
        if (dobDate.getMonth() >= currentDate.getMonth() && dobDate.getDate() > currentDate.getDate() ) {
            age = (currentDate.getFullYear() - dobDate.getFullYear()) - 1;
        } else {
            age = currentDate.getFullYear() - dobDate.getFullYear();
        }
        return `${age} years`;
    } catch (error) {
        console.log(error);
        return "0";
    }
}