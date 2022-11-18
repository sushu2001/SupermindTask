import React from "react";
import FilterBar from "./FilterBar";
// import '/main.css';
import Pagination from "./Pagination";




class DisplayTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      searchUsername: "",
      searchEmail: "",
      postsPerPage:10,
      currentPage:1,
      searchSub: new Set(["Active", "Blocked", "Pending", "Idle"]),
      searchGender: new Set([
        "Male",
        "Female",
        "Genderqueer",
        "Non-binary",
        "Genderfluid",
        "Polygender",
        "Bigender",
        "Agender",
      ]),
    };
    this.userRef = React.createRef(null);
    this.callAPI = this.callAPI.bind(this);
  }
  componentDidMount() {
    this.callAPI();
  }
  callAPI() {
    //Fetch data from API
   
    fetch("https://random-data-api.com/api/users/random_user?size=100")
      .then((response) => response.json())
      .then((array) => this.setState({ list: array }))
      
  }
  handleChangeOnUsername = (e) => {
    this.setState({ searchUsername: e.target.value });
  };
  handleChangeOnEmail = (e) => {
    this.setState({ searchEmail: e.target.value });
  };
  handleChangeOnCount = (e) => {
   
    if (e.target.value === "") this.setState({ postsPerPage: 10 });
    else this.setState({ postsPerPage: e.target.value });
  };

  handleChangeOnSub = (e) => {
    if (e.target.value === "") {
      this.setState(() => ({
        searchSub: new Set(["Active", "Blocked", "Pending", "Idle"]),
      }));
    } else {
      this.setState(({ searchSub }) => ({ searchSub: searchSub.clear() }));
      this.setState(({ searchSub }) => ({
        searchSub: new Set(searchSub).add(e.target.value),
      }));
    }
    console.log(this.state.searchSub);
  };

  handleChangeOnGender = (e) => {
    if (e.target.value === "") {
      this.setState(() => ({
        searchGender: new Set([
          "Male",
          "Female",
          "Genderqueer",
          "Non-binary",
          "Genderfluid",
          "Polygender",
          "Bigender",
          "Agender",
        ]),
      }));
    } else {
      this.setState(({ searchGender }) => ({
        searchGender: searchGender.clear(),
      }));
      this.setState(({ searchGender }) => ({
        searchGender: new Set(searchGender).add(e.target.value),
      }));
    }
    console.log(this.state.searchGender);
  };

  handleClick = () => {
    this.setState({
      ...this.state,
      searchUsername: "",
      searchEmail: "",
      postsPerPage: 10,
      searchGender:new Set(["Male","Female","Genderqueer","Non-binary","Genderfluid","Polygender","Bigender","Agender"]),
      searchSub: new Set(["Active", "Blocked", "Pending", "Idle"]),
    });
    this.userRef.current.value = "";
  };

 
    
    
 

  generateGenderDataForDropdown = () => {
    return [...new Set(this.state.list.map((item) => item.gender))];
  };

  render() {
    
    const {list,searchUsername,searchEmail,postsPerPage, currentPage,searchSub,searchGender} = this.state;
    const indexOfLastPost= currentPage* postsPerPage;
    const indexOfFirstPost= indexOfLastPost- postsPerPage;

    const paginate=(pageNumber)=> this.setState({currentPage:pageNumber})  

   

    var filteredList = list.filter(
        (user) =>
          user.username.toLowerCase().includes(searchUsername.toLowerCase()) &&
          user.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
          searchSub.has(user.subscription.status) &&
          searchGender.has(user.gender)
      );
      filteredList= filteredList.slice(indexOfFirstPost, indexOfLastPost);


    var Genders = this.generateGenderDataForDropdown();
    //console.log(filteredList)
    let tb_data = filteredList.map((item) => {
      return (
        <tr key={item.id}>
          <td>
            {item.first_name} {item.last_name}
          </td>
          <td>{item.subscription.status}</td>
          <td>{item.gender}</td>
          {/* <td>{item.username}</td>
                    <td>{item.email}</td> */}
          <td>{item.credit_card.cc_number}</td>
          <td>{item.address.city}</td>
        </tr>
      );
    });

   
    return (
      <div className="container mainCont">
        <div>
          <FilterBar
            handleChangeOnUsername={this.handleChangeOnUsername}
            handleChangeOnEmail={this.handleChangeOnEmail}
            handleChangeOnCount={this.handleChangeOnCount}
            handleClick={this.handleClick}
            handleChangeOnSub={this.handleChangeOnSub}
            handleChangeOnGender={this.handleChangeOnGender}
            Genders={Genders}
            userRef={this.userRef}
          />
        </div>
        <div className="showing" style={{fontSize:"15px", marginLeft: "9px", marginBottom:"20px"}}>
            <strong >{`Showing ${indexOfFirstPost+1}-${indexOfLastPost} of 100`}</strong>
        </div>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Name</th>
              <th className="stLable">Status</th>
              <th>Gender</th>
              <th>Credit Card Number</th>
              <th>Address</th>
            </tr>
            {tb_data}
          </tbody>
        </table>
        <Pagination postsPerPage={postsPerPage} totalPosts={list.length} paginate={paginate}/>
        
      </div>
    );
  }
}

export default DisplayTable;
