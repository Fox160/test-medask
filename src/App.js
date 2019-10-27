import React from 'react';
import Popup from './Popup';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import selectStyles from './selectStyles';

import insuranceCompanies from './data/insuranceCompanies'
import services from './data/services';

import include from './img/include.svg'
import notInclude from './img/not-include.svg'
import notFound from './img/not-found.svg'
import cancel from './img/cancel.svg';
import './style.scss';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      policyNumber: '',
      insuranceCompany: '',
      insuranceType: '',
      service: '',
      services: [],
      phone: '',
      expirationDate: '',
      isChecked: false,
      isValid: true
    }
  }

  handleInput = async (event) => {
    const {value} = event.target;
    await this.setState({policyNumber: value});

    this.getInsuranceData();
  }

  handleInputChange = (inputValue, action) => {
    if (action.action !== "input-blur" && action.action !== "menu-close") {
      this.setState({ service: inputValue });
    }
  }

  handleChange = (newValue, actionMeta) => {
    let oldServices = [...this.state.services];
    if (actionMeta.name === 'service') {
      if (!this.isExist(newValue.value)) {
        oldServices.push({name: newValue.value});
      }
    }
    
    this.setState({ 
      [actionMeta.name]: newValue.value,
      services: oldServices
    });
  };

  isExist = (value) => {
    return this.state.services.some(item => value === item.name);
  }


  handleCreate = (inputValue) => {
    if (this.isExist(inputValue)) {
      return;
    }
    
    this.setState({
      service: inputValue,
      services: [...this.state.services, {name: inputValue}]
    });
  };


  removeService = (item) => {
    var array = this.state.services.filter(function(s) { return s !== item });
    this.setState({
      services: array 
    });
  }

  toggleClass = (name) => {
    this.setState({ insuranceType: name });
  }

  checkServices = () => {
    if (!this.getInsuranceData()) {
      this.setState({
        isValid: false
      })
      return;
    }
    
    this.getServiceData();
    this.setState({ isChecked: true})
  }

  getInsuranceData = () => {
    let result = insuranceCompanies.filter(company => {
      return company.policy.find(policy => policy.number.startsWith(this.state.policyNumber))
    });

    if (result.length !== 0 && this.state.policyNumber) {
      let policyItem = result[0].policy.find(policy => policy.number.startsWith(this.state.policyNumber));

      this.setState({
        insuranceType: policyItem.type,
        insuranceCompany: result[0].value,
        phone: result[0].phone,
        expirationDate: policyItem.expirationDate
      })

      return true;
    } else {
      this.setState({
        insuranceType: '',
        insuranceCompany: ''
      })

      return false;
    }
  }

  getServiceData = () => {
    let result = this.state.services.map(element => {
      let elementType = services.find(dbElement => dbElement.value === element.name);
      return {
        name: element.name, 
        type: elementType !== undefined ? elementType.type : elementType
        }
    });
    this.setState({
      services: [...result]
    })
  }

  setServiceImg = (service) => {
    if (service.type === 'include') {
      return <img className='item-checked__img' src={include} alt='Включена'/>
    } else if (service.type === 'notInclude') {
      return <img className='item-checked__img' src={notInclude} alt='Не включена'/>
    } else {
      return <img className='item-checked__img' src={notFound} alt='Не найдена'/>
    }
  }

  makeNewRequest = () => {
    this.setState({
      policyNumber: '',
      insuranceCompany: '',
      insuranceType: '',
      service: '',
      services: [],
      phone: '',
      expirationDate: '',
      isChecked: false
    })
  }

  render() {
    let isValidFields = this.state.insuranceCompany && this.state.insuranceType && this.state.policyNumber && this.state.services.length > 0;
    const { insuranceCompany } = this.state.insuranceCompany;
    
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

              {this.state.isChecked ? <span style={{paddingLeft: '20px'}}>Дата окончания: {this.state.expirationDate} г.</span> : null}
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
              {this.state.isChecked ? <span style={{paddingLeft: '15px'}}>Телефон {this.state.phone}</span> : null}
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
                {this.state.isChecked ? this.setServiceImg(service) : null}
                <span className="item__text">{service.name}</span>
                {!this.state.isChecked ? <img className='item__img' src={cancel} onClick={this.removeService.bind(this, service.name)} alt='Отмена'/> : null}
              </div>
            )
          })}
        </div>
        {!this.state.isChecked ? 
          <button onClick={isValidFields ? this.checkServices : null} className={isValidFields ? 
          "button button--orange button--active" : "button button--orange"}>Проверить</button> : 
          <button className='button button--turquiose' onClick={this.makeNewRequest}>Новый запрос</button>
        }

        {!this.state.isValid ? <Popup/> : null}
      </div>
    )
  }
}

export default App;
