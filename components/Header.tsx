import styled from "styled-components";

const HeaderWrapper = styled.header.attrs({
  className: "bg-blue-600 text-white p-4 mb-8 w-full",
})``;

const Title = styled.h1.attrs({
  className: "text-2xl font-bold text-center",
})``;

const Header = () => (
  <HeaderWrapper>
    <Title>Пользователи</Title>
  </HeaderWrapper>
);

export default Header;
