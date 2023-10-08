import SearchIcon from "../assets/search.svg";

function Search({searchActor}) {
    return (
        <>
            <div className="search-input-group">
                <span className="search-input-icon">
                    <img
                        src={SearchIcon}
                        alt="Search Icon"
                    />
                </span>
                <input
                    id="search"
                    placeholder="Search user"
                    onChange={(e) => searchActor(e.target.value)}
                />
            </div>
        </>
    )
}

export default Search;