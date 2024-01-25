import Select from "react-select";
import { Country, State, City } from "country-state-city";

const CountrySelect = (props: any) => {
  const countryOptions = Country.getAllCountries().map((country) => {
    return { value: country.name, label: country.name, code: country.isoCode };
  });
  return (
    <Select options={countryOptions} {...props} style={{ fontSize: "14px" }} />
  );
};

export default CountrySelect;

export const StateSelect = (props: any) => {
  const stateOptions = State.getStatesOfCountry(props.country.code || "IN").map(
    (state) => {
      return {
        value: state.name,
        label: state.name,
        countryCode: state.countryCode,
        code: state.isoCode,
      };
    }
  );
  return (
    <Select options={stateOptions} {...props} style={{ fontSize: "14px" }} />
  );
};

export const CitySelect = (props: any) => {
  const cityOptions = City.getCitiesOfState(
    props.state?.countryCode || "IN",
    props.state?.code || "DL"
  ).map((city) => {
    return {
      value: city.name,
      label: city.name,
      countryCode: city?.countryCode,
      stateCode: city.stateCode,
    };
  });
  return (
    <Select options={cityOptions} {...props} style={{ fontSize: "14px" }} />
  );
};
