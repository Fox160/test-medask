export default {
    input: (base) => ({
        ...base,
        padding: 0,
        paddingLeft: '18px',
        fontSize: '18px',
    }),
    valueContainer: (base) => ({
      ...base,
      padding: 0,
      height: '25px'
    }),
    singleValue: (base) => ({
      ...base,
      padding: 0,
      margin: 0
    }),
    placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          padding: 0,
          paddingLeft: '18px',
          fontSize: '14px',
          margin: 0
      }
  },
    control: (base, state) => ({
        ...base,
        width: '100%',
        fontSize: '18px',
        border: state.menuIsOpen ? '1px solid #66D1C6' : '1px solid #868686',
        boxShadow: state.isFocused ? 0 : 0,
        borderRadius: state.menuIsOpen ? '15px 15px 1px 1px' : '50px',
        '&:hover': {
            borderColor: state.menuIsOpen ? '#66D1C6' : '#868686',
        },
        borderBottom: state.isFocused ? 'none': '',
        overflow: 'hidden'

  }),
  menu: (base) => ({
    ...base,
    margin: 0,
    border: '1px solid #66D1C6',
    borderRadius: '1px 1px 15px 15px',
    borderTop: 'none',
    boxShadow: 0,
    fontSize: '14px',
    overflow: 'hidden'
}),
  menuList: (provided, state) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0
  }),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        '&:hover': {
          backgroundColor: '#66D1C6',
          color: 'white'
       },
        overflow: 'hidden',
        padding: 0,
        color: 'black',
        backgroundColor: isDisabled ? 'grey' : 'white',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
  };