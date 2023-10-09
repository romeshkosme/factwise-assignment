
import DOWN from "../assets/down.svg";
import UPICON from "../assets/up.svg";
import { useState } from "react";
import Modal from "./Modal";
import Actor from "./Actor";
import { calculateAge } from "../utils/util";
import toast from "react-hot-toast";

function ActorsList({actors, deleteActor, editActor}) {
    const [deleteModal, setDeleteModal] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [edit, setEdit] = useState(null);

    const onHandleToggleAccordion = (index) => {
        if (edit) {
            toast.error("Cannot toggle while in edit mode.")
            return;
        }
        setCurrentIndex(currentIndex === index ? null : index);
        setEdit(null);
    }

    const onHandleEditMode = (payload) => {
        if (payload === null) {
            setEdit(null);
            return;
        }
        payload["age"] = calculateAge(payload["dob"]);
        if (payload.age < 18) {
            toast.error("Permission denied!")
            return;
        }
        payload["edited"] = false;
        payload["name"] = `${payload.first} ${payload.last}`;
        setEdit(payload);
    }

    const onHandleChangeForm = (e) => {
        const {name, value} = e.target;

        setEdit(prev => ({
            ...prev,
            edited: true,
            [name.split("-")[0]]: value
        }));
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
                                <div className="image-name-group">
                                    <span className="profile-pic-wrapper">
                                        <img
                                            src={actor.picture}
                                            alt={`${actor.first} picture`}
                                        />
                                    </span>
                                    {edit?.id === actor.id ? 
                                        <input
                                            name={`name-${actor.id}`}
                                            id={`name-${actor.id}`}
                                            className="input-name"
                                            value={edit.name} 
                                            onChange={onHandleChangeForm}
                                        /> :
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
                                    actor={actor}
                                    edit={edit}
                                    index={index}
                                    onChangeEdit={setEdit}
                                    onHandleEditMode={onHandleEditMode}
                                    onHandleSubmit={editActor}
                                    setDeleteModal={setDeleteModal}
                                    onHandleChangeForm={onHandleChangeForm}
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