import { useState } from "react";
import { calculateAge } from "../utils/util";
import { GENDERS } from "../utils/Constant";
import DELETEICON from "../assets/delete.svg";
import EDITICON from "../assets/edit.svg";
import CANCELICON from "../assets/cancel.svg";
import CHECKICON from "../assets/check.svg";

function Actor({data, edit, index, onHandleEditMode, onHandleSubmit, setDeleteModal}) {
    const [actor, setActor] = useState(data);
    
    const onHandleChangeForm = (e) => {
        const {name, value} = e.target;
        setActor(prev => ({
            ...prev,
            [name.split("-")[0]]: value
        }));
    }
    return (
        <>
            <div className="actor-info-row input-row-one">
                <div className="input-group">
                    <label htmlFor={`age-${actor.id}`}>Age</label>
                    {edit === index ? <input
                        name={`age-${actor.id}`}
                        id={`age-${actor.id}`}
                        placeholder="Age"
                        value={calculateAge(actor.dob)}
                        onChange={onHandleChangeForm}
                    /> : <p>{calculateAge(actor.dob)}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor={`gender-${actor.id}`}>Gender</label>
                    {edit === index ? <select
                        id={`gender-${actor.id}`}
                        name={`gender-${actor.id}`}
                        value={actor.gender}
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
                    {edit === index ? <input
                        id={`country-${actor.id}`}
                        name={`country-${actor.id}`}
                        value={actor.country}
                        onChange={onHandleChangeForm}
                    /> : 
                    <p>{actor.country}</p>
                    }
                </div>
            </div>
            <div className="actor-info-row input-row-two">
                <div className="input-group">
                    <label htmlFor={`description-${actor.id}`}>Description</label>
                    {edit === index ? <textarea
                        id={`description-${actor.id}`}
                        name={`description-${actor.id}`}
                        rows={5}
                        value={actor.description}
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
                            onClick={() => onHandleEditMode(index)}
                        >
                            <img
                                src={EDITICON}
                                alt="edit icon"
                            />
                        </span>
                    </>
                )}
                {
                    edit === index && (
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
                            onClick={() => {
                                onHandleSubmit(actor.id, actor);
                                onHandleEditMode(null);
                            }}
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