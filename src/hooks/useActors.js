import { useState } from "react";
import ACTORS from "../utils/celebrities.json";

const dummy_actors = ACTORS;

function useActors() {
    const [actors, setActors] = useState(dummy_actors);

    const searchActor = () => {
        let timer;

        return (query) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                const searchFilter = actors.filter((actor, index) => actor.first.toLowerCase().includes(query));
                clearTimeout(timer);
                setActors(query === "" ? dummy_actors : searchFilter);
            }, 500);
        }
    }

    const deleteActor = (id) => {
        const deletedFilter = actors.filter(actor => id !== actor.id);

        setActors(deletedFilter);
    }

    const editActor = (id, payload) => {
        const updatedActors = actors.map((actor, index) => {
            if (actor.id === id) return payload;
            return actor;
        })
        setActors(updatedActors);
    }

    return {
        actors,
        searchActor,
        deleteActor,
        editActor
    }
}

export default useActors;