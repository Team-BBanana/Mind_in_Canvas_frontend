import SelectKidsComponent from "./component/SelectKidsComponent";
import { kidsData } from "./kidsData";

const SelectKidsPage = () => {
    return (
        <div>
            <SelectKidsComponent kids={kidsData} />
        </div>
    );
};

export default SelectKidsPage;