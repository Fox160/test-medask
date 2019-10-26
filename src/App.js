import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import selectStyles from './selectStyles';
import insuranceCompanies from './data/insuranceCompanies'
import services from './data/services';

import cancel from './img/cancel.svg';
import notFound from './img/not-found.svg'
// import './App.css';
import './style.scss';
import { isTSEnumMember } from '@babel/types';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      policyNumber: '',
      insuranceCompany: '',
      insuranceType: '',
      service: '',
      services: [],
      activeIndex: 0,
      isChecked: false
    }
  }

  handleInput = async (event) => {
    const {value} = event.target;
    await this.setState({policyNumber: value});
    console.log(this.state.policyNumber);
    
    this.getInsuranceData();
  }

  handleInputChange = (inputValue, action) => {
    if (action.action !== "input-blur" && action.action !== "menu-close") {
      this.setState({ service: inputValue });
    }
  }

  handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.name}`);
    console.groupEnd();

    let oldServices = [...this.state.services];
    if (actionMeta.name === 'service') {
      if (!this.isExist(newValue.value)) {
        oldServices.push(newValue.value);
      }
    }
    
    this.setState({ 
      [actionMeta.name]: newValue.value,
      services: oldServices
    });
  };

  isExist = (value) => {
    return this.state.services.some(item => value === item);
  }


  handleCreate = (inputValue) => {
    console.group('Option created');
    console.log(inputValue);
    console.groupEnd();

    if (this.isExist(inputValue)) {
      console.log('already have service in array');
    }
    
    this.setState({
      service: inputValue,
      services: [...this.state.services, inputValue]
    });
  };


  removeService = (item) => {
    var array = this.state.services.filter(function(s) { return s !== item });
    console.log(array);
    this.setState({services: array });
    
  }

  toggleClass = (name) => {
    this.setState({ insuranceType: name });
  }

  checkServices = () => {
    this.setState({ isChecked: true})
  }

  getInsuranceData = () => {
    let result = insuranceCompanies.filter(company => {
      return company.policy.find(policy => policy.number.startsWith(this.state.policyNumber))
    });
    console.log(result[0]);

    this.setState({
      insuranceCompany: result[0].value
    })
  }

  getServiceData = () => {

  }

  render() {
    let isValidFields = this.state.insuranceCompany && this.state.policyNumber && this.state.services.length > 0;

    const { insuranceCompany } = this.state.insuranceCompany;
    console.log(this.state);
    
    return (
      <div className="wrapper">
        <h1 className="title">Проверка услуг медицинского страхования</h1>

        <div className="typesInsurance">
          <button className={this.state.insuranceType === 'ОМС' ? 'typesInsurance__item typesInsurance--active' : 'typesInsurance__item'} 
                onClick={this.toggleClass.bind(this, 'ОМС')}>ОМС</button>
          <button className={this.state.insuranceType === 'ДМС' ? 'typesInsurance__item typesInsurance--active' : 'typesInsurance__item'} 
                onClick={this.toggleClass.bind(this, 'ДМС')}>ДМС</button>
        </div>
        <form className="form">
          <div className="form__group">
            <div style={{width: '436px', textAlign: 'left', marginRight: '26px'}}>
              <input 
                name="policyNumber" 
                value={this.state.policyNumber} 
                className="form__input" 
                onChange={this.handleInput} 
                placeholder="Введите номер полиса">
              </input>

              {this.state.isChecked ? <span style={{paddingLeft: '20px'}}>Дата окончания: 14.08.2020 г.</span> : null}
            </div>

            <div style={{width: '363px', textAlign: 'left'}}>
              <Select
                components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                name='insuranceCompany'
                style={{overflow: 'hidden'}}
                styles={selectStyles}
                value={insuranceCompany}
                onChange={this.handleChange}
                inputValue={insuranceCompany}
                placeholder="Введите страховую компанию"
                options={insuranceCompanies}
                noOptionsMessage={() => 'Страховая компания не найдена'}
                onCreateOption={() => null}
              />
              {this.state.isChecked ? <span style={{paddingLeft: '15px'}}>Телефон 8 (495) 123-45-67</span> : null}
            </div>
            
          </div>
          
          <label className="form__label">Выберите медицинские услуги</label>
          <CreatableSelect
            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
            name='service'
            styles={selectStyles}
            value={this.state.service}
            onInputChange={this.handleInputChange}
            onChange={this.handleChange}
            onCreateOption={this.handleCreate}
            placeholder="Введите запрашиваемую услугу для пациента"
            options={services}
            formatCreateLabel={inputValue => `Добавить ${inputValue}`}
            noOptionsMessage={() => 'Услуга не найдена'}
          />
        </form>

        <div className="service">
          {this.state.services.map((service, key) => {
            return (
              <div key={key} className="service__item service__item--right">
                {this.state.isChecked ? <img className='item-checked__img' src={notFound} alt='Не найдено'/> : null}
                <span className="item__text">{service}</span>
                {!this.state.isChecked ? <img className='item__img' src={cancel} onClick={this.removeService.bind(this, service)} alt='Отмена'/> : null}
              </div>
            )
          })}
        </div>
        {!this.state.isChecked ? 
          <button onClick={isValidFields ? this.checkServices : null} className={isValidFields ? 
          "button button--orange button--active" : "button button--orange"}>Проверить</button> : 
          <button className='button button--turquiose'>Новый запрос</button>
        }
      </div>
    )
  }
}

export default App;
