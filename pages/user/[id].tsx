import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { getUserById } from "@/services/userService";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import styled from "styled-components";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { User } from "@/types";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

interface UserPageProps {
  user: User;
}

const UserDetail = styled.div.attrs({
  className:
    "container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen",
})``;

const UserCardWrapper = styled.div.attrs({
  className: "border p-4 rounded shadow w-full md:w-1/2 lg:w-1/3 bg-white",
})``;

const UserImage = styled.img.attrs({
  className: "w-32 h-32 rounded-full mb-4 mx-auto border-2 border-gray-300",
})``;

const UserName = styled.h2.attrs({
  className: "text-2xl font-bold text-center mb-2",
})``;

const UserDetails = styled.p.attrs({
  className: "text-gray-700 text-center mb-2 flex items-center",
})``;

const UserDetailIcon = styled.span.attrs({
  className: "mr-2 text-blue-500",
})``;

const BackButton = styled(Link)`
  margin-top: 20px;
  width: 100%; // Полная ширина для мобильных устройств
  background-color: #3b82f6; // Цвет фона (Tailwind blue-500)
  color: white; // Цвет текста
  padding: 12px; // Отступы
  text-align: center; // Выравнивание текста
  border-radius: 4px; // Скругление углов
  transition: background-color 0.3s; // Плавный переход цвета

  &:hover {
    background-color: #2563eb; // Цвет при наведении (Tailwind blue-600)
    text-decoration: none; // Убираем подчеркивание
  }
`;

const UserPage = ({ user }: UserPageProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Header />
      <UserDetail>
        <UserCardWrapper>
          <UserImage src={user.picture.large} alt={user.name.first} />
          <UserName>
            {user.name.first} {user.name.last}
          </UserName>
          <UserDetails>
            <UserDetailIcon>
              <FaMapMarkerAlt />
            </UserDetailIcon>
            Адрес: {user.location.street.number} {user.location.street.name},{" "}
            {user.location.city}, {user.location.state}, {user.location.country}
            , {user.location.postcode}
          </UserDetails>
          <UserDetails>
            <UserDetailIcon>
              <FaEnvelope />
            </UserDetailIcon>
            Email: {user.email}
          </UserDetails>
          <UserDetails>
            <UserDetailIcon>
              <FaPhoneAlt />
            </UserDetailIcon>
            Сотовый: {user.cell}
          </UserDetails>
          <UserDetails>Возраст: {user.dob.age}</UserDetails>
          <UserDetails>Пол: {user.gender}</UserDetails>
        </UserCardWrapper>
        <BackButton href="/">Назад</BackButton>
      </UserDetail>
    </div>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;

  try {
    const user = await getUserById(id);
    return { props: { user } };
  } catch (error) {
    return { notFound: true };
  }
};

export default UserPage;
