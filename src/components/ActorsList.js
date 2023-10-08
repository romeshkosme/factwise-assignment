
import DOWN from "../assets/down.svg";
import UPICON from "../assets/up.svg";
import { useState } from "react";
import Modal from "./Modal";
import Actor from "./Actor";

function ActorsList({actors, deleteActor, editActor}) {
    const [deleteModal, setDeleteModal] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [edit, setEdit] = useState(null);

    const onHandleDelete = (id) => {
        setDeleteModal(id);
    }

    const onHandleToggleAccordion = (index) => {
        setCurrentIndex(currentIndex === index ? null : index);
        setEdit(null);
    }

    const onHandleEditMode = (index) => {
        setEdit(index);
    }

    return (
        <>
            <div className="actors-list-group">
                {
                    actors.map((actor, index) => (
                        <div
                            key={`actor-item-${actor.id}`}
                            className="actor-list-item"
                        >
                            <div className="accordion-header">
                                <div class="image-name-group">
                                    <span className="profile-pic-wrapper">
                                        <img
                                            src={actor.picture}
                                            alt={`${actor.first} picture`}
                                        />
                                    </span>
                                    {edit === index ? 
                                        <input name={`name-${actor.id}`} id={`${actor.id}`} className="input-name" value={`${actor.first} ${actor.last}`} /> :
                                        <h3>{actor.first} {actor.last}</h3>
                                    }
                                </div>
                                <span
                                    className="expand-less-icon cursor-pointer"
                                    onClick={() => onHandleToggleAccordion(index)}
                                >
                                    {currentIndex !== index && <img src={DOWN} alt="down" />}
                                    {currentIndex === index && <img src={UPICON} alt="up icon" />}
                                </span>
                            </div>
                            <div className={`accordion-body ${currentIndex === index ? "active" : ""}`}>
                                <Actor
                                    data={actor}
                                    edit={edit}
                                    index={index}
                                    onHandleEditMode={onHandleEditMode}
                                    onHandleSubmit={editActor}
                                    setDeleteModal={setDeleteModal}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
            {deleteModal !== null && <Modal
                title={"Are you sure you want to delete?"}
                onClose={() => setDeleteModal(null)}
                onDelete={() => {
                    deleteActor(deleteModal);
                    setDeleteModal(null);
                    setCurrentIndex(null);
                }}
            />}
        </>
    )
}

export default ActorsList;