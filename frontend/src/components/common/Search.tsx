import searchImg from "../../assets/images/search-ico.svg";

interface searchBarProps {
  placeholder?: string;
  extraClass?: string;
  extraStyle?: any;
  handleSearch?: any;
  search?: string;
}

const SearchBar = (props: searchBarProps) => {
  const { placeholder, handleSearch, search } = props;
 
  return (
    <div
      className={`searchbox ${props.extraClass ? props?.extraClass : ""}`}
      style={props.extraStyle ? props?.extraStyle : {}}
    >
      <div className="form-group pb-0">
        <input
          placeholder={placeholder ? placeholder : "Search Doctors..."}
          type="text"
          id="formBasicSearch"
          className="form-control"
          value={search}
          onChange={e => handleSearch(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-transparent">
        <img src={searchImg} alt="Find Doctors for you" />
      </button>
    </div>
  );
};

export default SearchBar;
