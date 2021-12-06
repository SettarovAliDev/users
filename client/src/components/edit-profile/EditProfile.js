import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { addProfile } from "../../store/currentUserSlice";

import {
  EditProfileContainer,
  EditProfileForm,
  EditProfileRadio,
  ButtonsContainer,
  CheckSvgStyled,
  CloseSvgStyled,
} from "./EditProfileStyles";

const EditProfile = ({ onEditCloseHandler }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [city, setCity] = useState("");

  const params = useParams();

  const { userId } = params;

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
        userId,
      })
    );

    onEditCloseHandler();
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
        <EditProfileRadio>
          <input
            type="radio"
            id="gender-m"
            name="gender"
            value="male"
            required
            onChange={onChangeGenderHandler}
          />
          <label htmlFor="gender-m">male</label>
          <input
            type="radio"
            id="gender-f"
            name="gender"
            value="female"
            required
            onChange={onChangeGenderHandler}
          />
          <label htmlFor="gender-f">female</label>
        </EditProfileRadio>

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
        <ButtonsContainer>
          <button type="submit">
            <CheckSvgStyled />
          </button>
          <button type="button" onClick={onEditCloseHandler}>
            <CloseSvgStyled />
          </button>
        </ButtonsContainer>
      </EditProfileForm>
    </EditProfileContainer>
  );
};

export default EditProfile;
