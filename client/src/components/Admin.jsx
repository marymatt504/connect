import React from 'react';

function Admin(props) {
  return (
    <div>
      <button onClick={props.mixGroups}>
        Mix groups!
      </button>
      <button onClick={props.seeGroups}>
        See groups.
      </button>
    </div>
  )
}

export default Admin;

