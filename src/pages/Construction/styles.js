import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px;
`;

export const DocumentOptions = styled.ul`
  background-color: #F0F2F5;
  padding: 16px 43px 4px 25px;
  list-style: none;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    width: 70px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: #1890FF;
      border-radius: 50%;
    }
    svg {
      width: 22.03px;
      height: 16.73px;
      color: #fff;
    }
    span {
      text-align: center;
    }
  }
`;

export const DocumentInfo = styled.div`
  display: flex;
  flex-direction: column;
  .info {
    display: flex;
    align-items: center;
    width: 618px;
    height: 48px;
    border: 1px solid #F0F2F5;
    border-radius: 3px;
    background-color: #FAFAFA;
  }
`;

