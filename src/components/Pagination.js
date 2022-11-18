import React from "react";

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
  const pageNumbers = [];
  for(let i=1;i<=Math.ceil(totalPosts / postsPerPage);i++){
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav style={{display: "flex",
    justifyContent: "center",}}>
        <ul class="pagination">
            
          <li class="page-item">
            <button class="page-link" >
              Previous
            </button>
          </li>  
            {
                pageNumbers.map((number) => (
                  <li key={number} className="page-item">
                    <button onClick={()=>paginate(number)}  className="page-link">{number}</button>
                  </li>
                ))
            }
          <li class="page-item">
            <button class="page-link" >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
