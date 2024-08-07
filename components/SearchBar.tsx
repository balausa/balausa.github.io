import styled from "styled-components";

const SearchWrapper = styled.div.attrs({
  className: "flex justify-center my-4",
})``;

const SearchInput = styled.input.attrs({
  className: "border p-2 w-full max-w-md",
})``;

const SearchButton = styled.button.attrs({
  className: "bg-blue-500 text-white py-2 px-4 ml-2 rounded",
})``;

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
}) => (
  <SearchWrapper>
    <SearchInput
      type="text"
      placeholder="ФИО"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <SearchButton onClick={handleSearch}>Поиск</SearchButton>
  </SearchWrapper>
);

export default SearchBar;
