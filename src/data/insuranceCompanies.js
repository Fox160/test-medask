import React from 'react';
import logo from '../img/Logo.svg'
import lightBulb from '../img/light-bulb.svg'
import swapVertical from '../img/swap-vertical-orientation-arrows.svg'


export default [
    { 
      policy: [{number: '1234-123456-78', type: 'ДМС', expirationDate: '16.08.2022'}, 
        {number: '98-76 5432-10', type: 'ОМС', expirationDate: '24.11.2023'}],
      phone: '8 (499) 123-45-68',
      value: 'СК Рандеву', 
      label: 
        <div className='option--left'>
          <img src={swapVertical} height="25px" width="25px" alt="swapVertical"/>
          <p>СК Рандеву</p>
        </div> },
    { 
      policy: [{number: '1234 12345678', type: 'ДМС', expirationDate: '14.08.2020'}, 
        {number: '9876 543210', type: 'ОМС', expirationDate: '15.08.2021'}],
      phone: '8 (495) 123-45-67',
      value: 'СК МЕД-АСКЕР', 
      label: 
        <div className='option--left'>
          <img src={logo} height="25px" width="25px" alt="logo"/>
           <p>СК МЕД-АСКЕР</p>
        </div> },
    { 
      policy: [{number: '12-341234-5678', type: 'ДМС', expirationDate: '25.11.2024'}, 
        {number: '9876-543210', type: 'ОМС', expirationDate: '26.11.2025'}],
      phone: '8 (812) 123-45-69',
      value: 'Страх-трах', 
      label: 
        <div className='option--left'>
          <img src={lightBulb} height="25px" width="25px" alt="lightBulb"/>
          <p>Страх-трах</p>
        </div> },
  ];