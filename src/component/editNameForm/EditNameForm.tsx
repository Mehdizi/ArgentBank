import React, { useState } from "react";
import "./EditNameForm.scss";
import { useDispatch } from "react-redux";
import { ThunkAppDispatch } from "../../app/store";
import { changeUserName } from "../../app/features/changeNameUser/changeNameUser";

export const EditNameForm = ({
  toggleForm,
  firstName,
  lastName,
}: {
  toggleForm: () => void;
  firstName: string;
  lastName: string;
}) => {
  const dispatch = useDispatch<ThunkAppDispatch>();
  const [lastNameToChange, setLastNameToChange] = useState("");
  const [firstNameToChange, setFirstNameToChange] = useState("");

  const handleResetFormField = () => {
    setFirstNameToChange("");
    setLastNameToChange("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      changeUserName({
        newFirstName: firstNameToChange,
        newLastName: lastNameToChange,
      })
    );
    toggleForm();
    handleResetFormField();
  };

  return (
    <form className="edit-name-form" onSubmit={(e) => onSubmit(e)}>
      <div className="edit-name-champs-wrapper">
        <div className="edit-name-champ">
          <label htmlFor="firstName"></label>
          <input
            placeholder={firstName}
            type="text"
            value={firstNameToChange}
            id="firstName"
            onChange={(e) => setFirstNameToChange(e.target.value)}
          />
        </div>
        <div className="edit-name-champ">
          <label htmlFor="lastName"></label>
          <input
            placeholder={lastName}
            type="text"
            value={lastNameToChange}
            id="firstName"
            onChange={(e) => setLastNameToChange(e.target.value)}
          />
        </div>
      </div>

      <div className="edit-name-buttons">
        <button>Save</button>
        <button onClick={() => toggleForm()}>Cancel</button>
      </div>
    </form>
  );
};
