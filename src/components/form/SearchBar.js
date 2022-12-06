import { FormControl } from "react-bootstrap";

const SearchBar = ({ data, setSearchedData, dataToSearch }) => {
  const handleSearchChange = (event) => {
    if (!event.target.value) return setSearchedData(data);

    const search = event.target.value;
    const filteredData = data.filter((item) => {
      return item[dataToSearch].toLowerCase().includes(search.toLowerCase());
    });
    setSearchedData(filteredData);
  };

  return (
    <FormControl
      type="text"
      placeholder="Wyszukaj użytkownika"
      className="mb-4"
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
