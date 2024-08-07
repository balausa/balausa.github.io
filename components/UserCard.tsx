import styled from "styled-components";
import Link from "next/link";
import { User } from "@/types";

const CardWrapper = styled.div.attrs({
  className: "border p-4 rounded shadow",
})``;

const UserImage = styled.img.attrs({
  className: "w-32 h-32 md:w-48 md:h-48 object-cover rounded-full",
})``;

const UserName = styled.h2.attrs({
  className: "text-xl font-bold",
})``;

const UserEmail = styled.p.attrs({
  className: "text-gray-700",
})``;

const UserCard = ({ user }: { user: User }) => (
  <CardWrapper>
    <UserImage src={user.picture.large} alt={user.name.first} />
    <UserName>
      {user.name.first} {user.name.last}
    </UserName>
    <UserEmail>{user.email}</UserEmail>
    <Link
      href={`/user/${user.login.uuid}`}
      className="text-blue-500 hover:underline"
    >
      Посмотреть данные
    </Link>
  </CardWrapper>
);

export default UserCard;
