import { useEffect, useState } from "react";
import { calculateAge, calculateDob } from "../utils/util";
import { GENDERS } from "../utils/Constant";
import DELETEICON from "../assets/delete.svg";
import EDITICON from "../assets/edit.svg";
import CANCELICON from "../assets/cancel.svg";
import CHECKICON from "../assets/check.svg";
import toast from 'react-hot-toast';

function Actor({actor, edit, index, onChangeEdit, onHandleEditMode, onHandleSubmit, setDeleteModal, onHandleChangeForm}) {

    const onHandleSave = () => {
        if (edit.edited) {
            const payload = {...edit};
            const {name} = payload;
            
            payload["first"] = name.split(" ")[0];
            payload["last"] = name.split(" ").slice(1).join(" ");
            payload["dob"] = calculateDob(payload["age"]);

            delete payload["age"];
            delete payload["edited"];
            delete payload["name"];

            // console.log("payload - ", payload)

            onHandleSubmit(payload.id, payload);
            onChangeEdit(null);
            toast.success("Edited successfully!")

        } else {
            toast.error("Nothing edited!")
        }
    }

    const validate = () => {
        console.log("age - ", actor)
        // NAME
        if (!actor?.name || !new RegExp(/^[a-zA-Z\s]*$/).test(actor["name"])) {
            console.log("name required or invalid")
        }
        // AGE
        if (!actor["age"] || !(new RegExp(/^\d+$/).test(actor["age"]))) {
            console.log("invlid age");
        }
        // country
        if (!actor["country"] || !new RegExp(/^[a-zA-Z\s]*$/).test(actor["country"])) {
            console.log("invalid country");
        }
        // description
        if (!actor["description"]) {
            console.log("description required");
        }
    }
    return (
        <>
            <div className="actor-info-row input-row-one">
                <div className="input-group">
                    <label htmlFor={`age-${actor.id}`}>Age</label>
                    {edit?.id === actor.id ? <input
                        name={`age-${actor.id}`}
                        id={`age-${actor.id}`}
                        placeholder="Age"
                        value={edit.age}
                        onChange={onHandleChangeForm}
                    /> : <p>{`${calculateAge(actor.dob)} years`}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor={`gender-${actor.id}`}>Gender</label>
                    {edit?.id === actor.id ? <select
                        id={`gender-${actor.id}`}
                        name={`gender-${actor.id}`}
                        value={edit.gender}
                        onChange={onHandleChangeForm}
                    >
                        {
                            GENDERS.map((gender, index) => (
                                <option
                                    key={gender.value}
                                    id={gender.value}
                                >
                                    {gender.label}
                                </option>
                            ))
                        }
                    </select> : <p>{actor.gender}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor={`country-${actor.id}`}>Country</label>
                    {edit?.id === actor.id ? <input
                        id={`country-${actor.id}`}
                        name={`country-${actor.id}`}
                        value={edit.country}
                        onChange={onHandleChangeForm}
                    /> : 
                    <p>{actor.country}</p>
                    }
                </div>
            </div>
            <div className="actor-info-row input-row-two">
                <div className="input-group">
                    <label htmlFor={`description-${actor.id}`}>Description</label>
                    {edit?.id === actor.id ? <textarea
                        id={`description-${actor.id}`}
                        name={`description-${actor.id}`}
                        rows={5}
                        value={edit.description}
                        onChange={onHandleChangeForm}
                    /> :
                    <p>{actor.description}</p>
                    }
                </div>
            </div>
            <div className="actor-info-row action-icon-group">
                {edit === null && (
                    <>
                        <span
                            onClick={() => setDeleteModal(actor.id)}
                        >
                            <img
                                src={DELETEICON}
                                alt="delete icon"
                            />
                        </span>
                        <span
                            onClick={() => onHandleEditMode(actor)}
                        >
                            <img
                                src={EDITICON}
                                alt="edit icon"
                            />
                        </span>
                    </>
                )}
                {
                    edit?.id === actor.id && (
                    <>
                        <span
                            onClick={() => onHandleEditMode(null)}
                        >
                            <img
                                src={CANCELICON}
                                alt="cancel icon"
                            />
                        </span>
                        <span
                            onClick={onHandleSave}
                        >
                            <img
                                src={CHECKICON}
                                alt="check icon"
                            />
                        </span>
                    </>
                )}
            </div>        
        </>
    )
}

export default Actor;