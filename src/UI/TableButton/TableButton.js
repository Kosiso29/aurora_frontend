import React from 'react';
// import classes from './TableButton.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

const tablebutton = (props) => (
    <div className="mt-2">
      <SplitButton
        title="Edit Profile"
        id="dropdown-menu-align-responsive-2"
        variant="info"
        onClick={props.clicked}
      >
        <Dropdown.Item eventKey="1">Medication</Dropdown.Item>
        <Dropdown.Item eventKey="2">Bills</Dropdown.Item>
        <Dropdown.Item eventKey="2" variant="danger" style={{ color: "red" }} onClick={props.delete}>Delete</Dropdown.Item>
      </SplitButton>
    </div>
    // <div className={classes.dropdown}>
    //     <button onClick={props.clicked} className={classes.dropbtn}>Edit Profile</button>
    //     <div className={classes.dropdownContent}>
    //         <p>Medical History</p>
    //         <p>Bills</p><hr></hr>
    //         <p style={{color: 'red'}} onClick={props.delete}>Delete</p>
    //     </div>
    // </div>
);

export default tablebutton;