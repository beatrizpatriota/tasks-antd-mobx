import styled from 'styled-components';

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: #fff;
  }
  .collapse {
    svg {
      width: 20px;
      height: 18px;
    }
  }
  .savedIcon {
    svg {
      width: 21px;
      height: 14.06px;
    }
  }
`;

export const UserContainer = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-right: 3px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  svg {
    width: 12px;
    height: 9px;
  }
`;