import styled from 'styled-components';

import { ReactComponent as CheckSvg } from '../../assets/check.svg';
import { ReactComponent as CloseSvg } from '../../assets/close.svg';

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 25rem;
  margin: 7rem 17rem;

  & > label {
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 1.7;
    cursor: pointer;
    color: var(--text-color-light-1);
  }

  & > input {
    font-size: 2.4rem;
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 1px solid var(--text-color-dark-1);
    margin-bottom: 2.5rem;

    &[type='checkbox'] {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1.2rem;
      margin-bottom: 0;
    }
  }

  button {
    width: 10rem;
    height: 3.8rem;
    align-self: center;
    background-color: var(--button-color-grey);
    border: none;
    border-radius: 0.9rem;
    cursor: pointer;
  }
`;

export const EditRadio = styled.div`
  display: flex;
  align-items: baseline;

  & label {
    margin-left: 1rem;
    font-size: 2.4rem;
    color: var(--text-color-dark-1);
  }

  & input:last-of-type {
    margin-left: auto;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
`;

export const CheckSvgStyled = styled(CheckSvg)`
  cursor: pointer;
  width: 24px;
  height: 24px;
  stroke: #4e4b66;
`;

export const CloseSvgStyled = styled(CloseSvg)`
  cursor: pointer;
  width: 24px;
  height: 24px;
  stroke: #4e4b66;
`;
