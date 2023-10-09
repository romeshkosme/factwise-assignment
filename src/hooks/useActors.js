import { useState } from "react";
import ACTORS from "../utils/celebrities.json";
import toast from "react-hot-toast";

let DB = [...ACTORS];

function useActors() {
    const [actors, setActors] = useState(DB);

    const searchActor = () => {
        let timer;

        return (query) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                const searchFilter = DB.filter((actor, index) => actor.first.toLowerCase().includes(query));
                clearTimeout(timer);
                setActors(query === "" ? DB : searchFilter);
            }, 500);
        }
    }

    const deleteActor = (id) => {
        const deletedFilter = DB.filter(actor => id !== actor.id);
        DB = [...deletedFilter];

        setActors(deletedFilter);

        toast.success("Deleted successfully!");
    }

    const editActor = (id, payload) => {
        const updatedActors = DB.map((actor, index) => {
            if (actor.id === id) return payload;
            return actor;
        })
        DB = [...updatedActors];
        setActors(updatedActors);
        toast.success("Saved successfully!");
    }

    return {
        actors,
        searchActor,
        deleteActor,
        editActor
    }
}

export default useActors;