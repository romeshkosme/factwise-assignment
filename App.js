import React from "react";
import Search from "./src/components/Search";
import ActorsList from "./src/components/ActorsList";
import ErrorBoundary from "./src/components/ErrorBoundary";
import useActors from "./src/hooks/useActors";

const App = () => {
    const {actors, searchActor, editActor, deleteActor} = useActors();
    return (
        <>
            <ErrorBoundary>
                <div className="wrapper">
                    <Search searchActor={searchActor()} />
                    <ActorsList
                        actors={actors}
                        deleteActor={deleteActor}
                        editActor={editActor}
                    />
                </div>
            </ErrorBoundary>
        </>
    )
}

export default App;