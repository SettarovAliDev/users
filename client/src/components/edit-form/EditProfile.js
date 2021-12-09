import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import { addProfile } from "../../store/usersSlice";
import { editProfile } from "../../store/usersSlice";

import {
  EditContainer,
  EditForm,
  EditRadio,
  ButtonsContainer,
  CheckSvgStyled,
  CloseSvgStyled,
} from "./EditStyles";

const EditProfile = ({ onEditCloseHandler, previousData }) => {
  const [name, setName] = useState(previousData?.name || "");
  const [gender, setGender] = useState(previousData?.gender || "");
  const [city, setCity] = useState(previousData?.city || "");
  const [birthdate, setBirthdate] = useState(previousData?.birthdate || "");

  const { userId } = useParams();

  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.auth.userId);

  const onChangeNameHandler = (e) => {
    setName(e.target.value);
  };

  const onChangeGenderHandler = (e) => {
    setGender(e.target.value);
  };

  const onChangeBirthdateHandler = (newValue) => {
    setBirthdate(newValue);
  };

  const onChangeCityHandler = (e) => {
    setCity(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (previousData) {
      dispatch(
        editProfile({
          name,
          gender,
          birthdate,
          city,
          profileId: previousData.id,
        })
      );
    } else {
      dispatch(
        addProfile({
          name,
          gender,
          birthdate,
          city,
          userId: userId || currentUserId,
        })
      );
    }

    onEditCloseHandler();
  };

  return (
    <EditContainer>
      <EditForm autocomplete="off" onSubmit={onSubmitHandler}>
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
        <EditRadio>
          <input
            type="radio"
            id="gender-m"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={onChangeGenderHandler}
            required
          />
          <label htmlFor="gender-m">male</label>
          <input
            type="radio"
            id="gender-f"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={onChangeGenderHandler}
            required
          />
          <label htmlFor="gender-f">female</label>
        </EditRadio>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="birthdate:"
            inputFormat="dd/MM/yyyy"
            value={birthdate}
            onChange={onChangeBirthdateHandler}
            maxDate={new Date()}
            renderInput={(params) => <TextField {...params} fontSize={50} />}
          />
        </LocalizationProvider>
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
      </EditForm>
    </EditContainer>
  );
};

export default EditProfile;
