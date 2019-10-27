import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';


class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: true };
    }

    hide() {
        this.setState({ visible: false });
    }

    render() {
        return (
            <div>
                <Rodal 
                    customStyles={{width: '396px', height: '213px', borderRadius: '15px', padding: 0}} 
                    visible={this.state.visible} 
                    onClose={this.hide.bind(this)} 
                    showCloseButton={false}
                    animation='slideDown'>

                    <div className="popup">
                        <h2 style={{fontWeight: 'bold', marginTop: '25px'}}>Полис с таким номером не обнаружен</h2>
                        <p style={{marginTop: 0, marginBottom: '30px'}}>Попробуйте изменить данные</p>
                        <button 
                            style={{padding: '10px 65px'}} 
                            className="button button--orange" 
                            onClick={this.hide.bind(this)}>Ок
                        </button>
                    </div>
                </Rodal>
            </div>
        )
    }
}

export default Popup;
