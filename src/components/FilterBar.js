import React from "react";
import SearchBox from "./Search box/SearchBox.component";
import "./FilterBar.style.css";

const FilterBar = ({
  handleChangeOnUsername,
  handleChangeOnEmail,
  handleChangeOnCount,
  handleClick,
  handleChangeOnSub,
  handleChangeOnGender,
  Genders,
  userRef
}) => {

 console.log(userRef)



  const options = [
    {
      label: "Select a Status",
      value: "",
    },
    {
      label: "Active",
      value: "Active",
    },
    {
      label: "Blocked",
      value: "Blocked",
    },
    {
      label: "Pending",
      value: "Pending",
    },
    {
      label: "Idle",
      value: "Idle",
    },
  ];

  // const [selectedOption, setSelectedOption] = useState('Active');

  // const handleChangeOnSub =(e)=>{
  //   setSelectedOption(e.target.value);
  //   console.log(selectedOption)
  // }

  return (
    <div className="container">
      <div className="header">
        <h3>Get Supermind</h3>
      </div>

      <div class="row">
        <div className="buttonBar">
          <b>Users(100)</b>
          <button type="button" className="btn1">
            Search
          </button>
          <button  type="button" onClick={handleClick} className="btn2">
            Reset
          </button>
        </div>

        <SearchBox
          placeholder="Search..."
          handleChange={handleChangeOnUsername}
          ref={userRef}
          label="Search by Username"
          type="text"
         
        />
        <SearchBox
          placeholder="Search..."
          handleChange={handleChangeOnEmail}
          label="Search by Email"
          type="email"
          class="searchLabel"
        />
        <SearchBox
          placeholder="10"
          handleChange={handleChangeOnCount}
          label="Count"
          type="number"
          class="searchLabel"
        />
        {/* <SearchGenderBox handleChange={handleChangeOnGender} /> */}
        <div class="col-sm">
          <div>
            Gender
            <br />
            <select onChange={handleChangeOnGender}>
              <option value="">Select a type</option>
              {Genders.map((gender) => (
                <option value={gender} key={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div class="col-sm selectOption">
          <div>Subscription Status</div>
          <select onChange={handleChangeOnSub}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
