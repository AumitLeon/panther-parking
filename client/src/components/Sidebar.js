import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
//import { List, isImmutable } from 'immutable';

// style for components
const Side = Styled.div`
top: 9%;
height: 100%;
width: 22%;
position: absolute;
z-index: 1000;
background-color: #5e1a54;
`;

const Item = Styled.ul`
    padding: 12px 8px 8px 32px;
    font-size: 15px;
    color: #e3e3e3;
    display: block;
    transition: 0.3s;
    word-wrap: break-word;
`;

const Sidebar = props => {
  const [parkable, setParkable] = useState({});

  useEffect(() => {
    const timeInHours = props.timeIn.getHours();
    const timeOutHours = props.timeOut.getHours();
    const dateDay = props.date.getDay();
    fetch(
      `/api/lots/basicInfo/${props.permitType}/${props.userType}/${timeInHours}/${timeOutHours}/${dateDay}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setParkable(data);
      })
      .catch(err => console.log(err));
  }, [
    props.permitType,
    props.userType,
    props.timeIn,
    props.timeOut,
    props.date
  ]);

  if (parkable.features) {
    const infoList = parkable.features.map(element => (
      <div>
        <h3> Lot name: </h3>
        <p>{element.properties.name}</p>
        <h3> Description: </h3>
        <p>{element.properties.description}</p>
        <h3>Permits allowed: </h3>
        <p>{element.properties.permits.join(' ')}</p>
        <br />
      </div>
    ));
    return (
      <Side>
        <Item>{infoList}</Item>
      </Side>
    );
  }
  return (
    <Side>
      <Item />
    </Side>
  );
};

Sidebar.propTypes = {
  permitType: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  timeIn: PropTypes.instanceOf(Date).isRequired,
  timeOut: PropTypes.instanceOf(Date).isRequired,
  date: PropTypes.instanceOf(Date).isRequired
};

export default Sidebar;
