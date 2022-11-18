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
            <a class="page-link" href="#">
              Previous
            </a>
          </li>  
            {
                pageNumbers.map((number) => (
                  <li key={number} className="page-item">
                    <a onClick={()=>paginate(number)} href="#" className="page-link">{number}</a>
                  </li>
                ))
            }
          <li class="page-item">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
