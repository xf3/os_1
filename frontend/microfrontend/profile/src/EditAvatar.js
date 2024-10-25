import React from "react";
import PopupWithForm from "../src/common/PopupWithForm";
import ProfileApi from "./api";
import "./styles/profile.css";

function EditAvatar({ isOpen, onSuccess, onClose }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    new ProfileApi()
      .setUserAvatar({ avatar: inputRef.current.value })
      .then((newUserData) => {
        onSuccess(newUserData);
      })
      .catch((err) => console.log(err));
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Обновить аватар"
      name="edit-avatar"
    >
      <label className="popup__label">
        <input
          type="url"
          name="avatar"
          id="owner-avatar"
          className="popup__input popup__input_type_description"
          placeholder="Ссылка на изображение"
          required
          ref={inputRef}
        />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatar;
