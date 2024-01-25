import searchImg from "../../assets/images/search-ico.svg";

interface searchBarProps {
  placeholder?: string;
  extraClass?: string;
  extraStyle?: any;
}

const SearchBar = (props: searchBarProps) => {
  const { placeholder } = props;
  const handleChange = (e: any) => {
    e.preventDefault();
  };
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
          value=""
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button type="submit" className="btn btn-transparent">
        <img src={searchImg} alt="Find Doctors for you" />
      </button>
    </div>
  );
};

export default SearchBar;
