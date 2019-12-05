import React from 'react';
import Form from './Form';
import logoLanding from '../static/logo4.png';
import carTop from '../static/carTop.png';
import carMiddle from '../static/carMiddle.png';
import carLeft from '../static/carLeft.png';
import carRight from '../static/carRight.png';
import styled from 'styled-components';
import { inherits } from 'util';
import Button from '@material-ui/core/Button';

const LandingPage = props => {
  const Wrapper = styled.div`
    margin-top: -1%;
  `;

  const Landingpage = styled.section`
    padding: 0;
    background: #5e1a54;
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
  `;
  const ImageBottom = styled.div`
    display: flex;
  `;
  return (
    <Landingpage>
      <img
        src={carTop}
        alt="car"
        style={{ position: 'fixed', top: '0px', width: '10%' }}
      />

      <img
        src={logoLanding}
        alt="logo"
        style={{
          // width: '25%',
          // height: '45%',
          // marginLeft: '40%',
          //marginTop: '%',
          marginBottom: '0%',
          display: 'flex',
          justifyContent: 'center',
          width: 'inherit',
          overflow: 'hidden'
        }}
      />
      <div
        style={{
          textAlign: 'center',
          flexDirection: 'row'
        }}
      >
        <h1
          style={{
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            width: 'inherit',
            overflow: 'hidden',

            flex: '1',
            flexDirection: 'column'
          }}
        >
          Making parking at Middlebury easier!
        </h1>
      </div>

      <Wrapper>
        <Form
          userType={props.userType}
          setUser={props.setUser}
          timeIn={props.timeIn}
          setTimeIn={props.setTimeIn}
          timeOut={props.timeOut}
          setTimeOut={props.setTimeOut}
          update={props.update}
          mobileOpen={props.mobileOpen}
          setMobileOpen={props.setMobileOpen}
          landing={props.landing}
          changeLandingPage={props.changeLandingPage}
          lotSelected={props.lotSelected}
          setLotSelected={props.setLotSelected}
        />
        <Button
          style={{
            borderRadius: '5px',
            background: 'orange',
            color: 'white',
            height: '40px',
            //width: '150px',
            flex: '1',
            alignItems: 'center',
            width: 'inherit',
            overflow: 'hidden',

            marginLeft: '45%',
            marginTop: '2%'
          }}
          onClick={() => {
            props.changeLandingPage(false);
          }}
        >
          Search
        </Button>
      </Wrapper>
      <ImageBottom>
        <img
          src={carLeft}
          alt="car"
          style={{ position: 'fixed', bottom: '0px', width: '13%' }}
        />
        <img
          src={carRight}
          alt="car"
          style={{
            position: 'fixed',
            bottom: '0px',
            right: '0px',
            width: '20%'
          }}
        />
        <img
          src={carMiddle}
          alt="car"
          style={{
            justifyContent: 'center',
            position: 'fixed',
            bottom: '0px',
            left: '45%',
            width: '15%'
          }}
        />
      </ImageBottom>
    </Landingpage>
  );
};

export default LandingPage;
