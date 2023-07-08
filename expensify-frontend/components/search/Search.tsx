import { FormInput } from "../input/formInput";

type SearchProp = {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Search: React.FC<SearchProp> = ({ onSearch }) => {
  return (
    <FormInput
      label="Search"
      type="text"
      name="search"
      placeholder="Search by merchant"
      onChange={onSearch}
    />
  );
};
