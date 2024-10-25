import React from "react";
import "./styles/profile.css";

function ViewProfile({ user, onEditAvatar, onEditProfile, onAddPlace }) {
  return (
    <section className="profile page__section">
      <div
        className="profile__image"
        onClick={onEditAvatar}
        style={imageStyle}
      ></div>
      <div className="profile__info">
        <h1 className="profile__title">{user.name}</h1>
        <button
          className="profile__edit-button"
          type="button"
          onClick={onEditProfile}
        ></button>
        <p className="profile__description">{user.about}</p>
      </div>
      <button
        className="profile__add-button"
        type="button"
        onClick={onAddPlace}
      ></button>
    </section>
  );
}

export default ViewProfile;
