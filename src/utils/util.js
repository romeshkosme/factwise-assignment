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
        return `${age}`;
    } catch (error) {
        console.log(error);
        return "0";
    }
}

export const calculateDob = (age) => {
    try {
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() - age);
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1) < 10 ? `0${currentDate.getMonth()+1}` : currentDate.getMonth()+1;
        const date = (currentDate.getDate()) < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
        return `${year}-${month}-${date}`;
    } catch (error) {
        console.log(error);
        return new Date;
    }
}