import toast from "react-hot-toast";

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

export const validate = (payload) => {
    // NAME
    if (!payload?.name) {
        toast.error("Name is required");
        return false;
    } else if (!new RegExp(/^[a-zA-Z\s]*$/).test(payload["name"])) {
        toast.error("Invalid name!");
        return false;
    }
    // AGE
    if (!payload["age"]) {
        toast.error("Age is required");
        return false;
    } else if (!(new RegExp(/^\d+$/).test(payload["age"]))) {
        toast.error("Invalid age!");
        return false;
    }
    // country
    if (!payload["country"]) {
        toast.error("Country is required");
        return false;
    } else if (!new RegExp(/^[a-zA-Z\s]*$/).test(payload["country"])) {
        toast.error("Invalid country!");
        return false;
    }
    // description
    if (!payload["description"]) {
        toast.error("Description is required");
        return false;
    }

    return true;
}