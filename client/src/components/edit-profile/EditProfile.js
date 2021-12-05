import { useState } from "react";
import { useDispatch } from "react-redux";

import { addProfile } from "../../store/profiles/profilesSlice";

import { EditProfileContainer, EditProfileForm } from "./EditProfileStyles";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [city, setCity] = useState("");

  const dispatch = useDispatch();

  const onChangeNameHandler = (e) => {
    setName(e.target.value);
  };

  const onChangeGenderHandler = (e) => {
    setGender(e.target.value);
  };

  const onChangeBirthdateHandler = (e) => {
    setBirthdate(e.target.value);
  };

  const onChangeCityHandler = (e) => {
    setCity(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    dispatch(
      addProfile({
        name,
        gender,
        birthdate,
        city,
      })
    );
  };

  return (
    <EditProfileContainer>
      <EditProfileForm autocomplete="off" onSubmit={onSubmitHandler}>
        <label htmlFor="name">name:</label>
        <input
          value={name}
          onChange={onChangeNameHandler}
          id="name"
          type="text"
          autoComplete="off"
          required
        />
        <label htmlFor="gender">gender:</label>
        <input
          value={gender}
          onChange={onChangeGenderHandler}
          id="gender"
          type="text"
          autoComplete="off"
          required
        />
        <label htmlFor="birthdate">birthdate:</label>
        <input
          value={birthdate}
          onChange={onChangeBirthdateHandler}
          id="birthdate"
          type="text"
          autoComplete="off"
          required
        />
        <label htmlFor="city">city:</label>
        <input
          value={city}
          onChange={onChangeCityHandler}
          id="city"
          type="text"
          autoComplete="off"
          required
        />
        <button type="submit">
          <span>Accept</span>
        </button>
      </EditProfileForm>
    </EditProfileContainer>
  );
};

export default EditProfile;
