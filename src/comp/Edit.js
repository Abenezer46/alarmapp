import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditOldlAarm from "./EditOldlAarm";
import New from "./New";

const Edit = () => {
  const  {id}  = useParams();
 

  return (
    <>
      {id === 'new' ? (

        <New />
      ) : (
        <EditOldlAarm />
        
      )}
    </>
  );

};

export default Edit;
