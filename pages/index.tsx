import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { getUsers } from "../services/userService";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";
import { User } from "@/types";
import Pagination from "@/components/Pagination";
import debounce from "lodash.debounce";

interface HomePageProps {
  initialUsers: User[];
  totalPages: number;
}

const HomePage = ({ initialUsers, totalPages }: HomePageProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    setError("");
    try {
      const data = await getUsers(page);
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filteredUsers = users.filter(
        (user: User) =>
          user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.name.last.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filteredUsers);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users,page]);

  const debouncedSearch = debounce((term: string) => {
    setSearchTerm(term);
  }, 300);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        typeof window !== "undefined" &&
        window.innerWidth < 768 &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
      ) {
        // Проверяем, что нет активной загрузки и что текущая страница меньше общей
        if (!loading && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, totalPages, page]);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={() => handleSearch}
        />
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <UserCard key={user.login.uuid} user={user} />
              ))}
            </div>
            {/* Пагинация для веб-версии */}
            {typeof window !== "undefined" && window.innerWidth >= 768 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialUsers = await getUsers(1);
    const totalPages = Math.ceil(100 / 10); // Предполагая, что всего 100 пользователей

    return { props: { initialUsers, totalPages } };
  } catch (error) {
    console.error(error);
    return { props: { initialUsers: [], totalPages: 0 } };
  }
};

export default HomePage;
