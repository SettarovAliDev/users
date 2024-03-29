import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addProfile } from '../../store/usersSlice';
import { editProfile } from '../../store/usersSlice';

import {
  EditContainer,
  EditForm,
  EditRadio,
  ButtonsContainer,
  CheckSvgStyled,
  CloseSvgStyled,
} from './EditStyles';

const EditProfile = ({ onEditCloseHandler, previousData }) => {
  const [name, setName] = useState(previousData?.name || '');
  const [gender, setGender] = useState(previousData?.gender || '');
  const [city, setCity] = useState(previousData?.city || '');
  const [birthdate, setBirthdate] = useState(previousData?.birthdate || '');

  const { userId } = useParams();

  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.auth.userId);

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
            data-testid="gender-m"
            type="radio"
            id="gender-m"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={onChangeGenderHandler}
            required
          />
          <label htmlFor="gender-m">male</label>
          <input
            data-testid="gender-f"
            type="radio"
            id="gender-f"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={onChangeGenderHandler}
            required
          />
          <label htmlFor="gender-f">female</label>
        </EditRadio>

        <label htmlFor="birthdate">birthdate:</label>
        <input
          value={birthdate}
          onChange={onChangeBirthdateHandler}
          id="birthdate"
          type="date"
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
          <button data-testid="add-profile" type="submit">
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
