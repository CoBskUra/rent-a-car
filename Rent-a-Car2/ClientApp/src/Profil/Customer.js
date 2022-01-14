import React,{Component} from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';

export class Customer extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            CustomerID:1,
            showReturned:false,
            ReturnedCars:[], 
            showCurrentrent:false, 
            currentRented:[],
        }
    }

    dowlandCurentRentedCars(){
        if(this.state.showCurrentrent)
        {
            fetch(process.env.REACT_APP_API +'/Api/GetRentedCars')
            .then(response=>response.json())
            .then(data=>{
                this.setState({currentRented:data});
            });
        }
    }

    dowlandReturnetCars(){
        if(this.state.showReturned)
        {
            fetch(process.env.REACT_APP_API +'/Api/GetReturnetCar')
            .then(response=>response.json())
            .then(data=>{
                this.setState({ReturnedCars:data});
            });
        }
    }

    refresh(){
        this.dowlandReturnetCars();
        this.dowlandCurentRentedCars();
    }
    

    return(rentID){
        fetch(process.env.REACT_APP_API +'/Api/Return/' + rentID)
            .then(response=>response.json())
            .then(data=>{
                alert(data);
            });
    }


    componentDidMount(){
        this.refresh();
    }

    componentDidUpdate(){
        this.refresh();
    }


    render(){
        const {currentRented, ReturnedCars} = this.state;
        return(
        <div>
            <ButtonToolbar>
                <Button className="history" variant="info" 
                onClick={()=>{
                    this.setState({showReturned:!this.state.showReturned});
                    
                }}>
                    Wyświetl historie wyporzyczeń aut
                </Button>
                <Button className="current" variant="info" 
                onClick={()=>{
                    this.setState({showCurrentrent:!this.state.showCurrentrent});
                    
                    }}>
                    Wyświetl obecnie wyporzyczone aura
                </Button>
            </ButtonToolbar>
            <div>
            { this.state.showCurrentrent &&
                <div>
                    <label aria-setsize={40} color="violet"> Obecnie wyporzyczone</label>
                    <Table>
                        <thead>
                        <tr>
                            <th>id detali auta</th>
                            <th>token</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentRented.map(cr=>
                            <tr key={cr.rentToken}>
                                <td>{cr.carDetailsID}</td>
                                <td>{cr.rentToken}</td>
                                <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="dark" 
                                    onClick={()=>this.return(cr.rentToken)}>
                                        Zwróć
                                    </Button>
                                    
                                    
                                </ButtonToolbar>
                                </td>
                            </tr>
                            )
                        }
                        </tbody>
                    </Table>
                </div>
                }
            </div>
            <div>
                { this.state.showReturned &&
                <div>
                    <label aria-setsize={40} color="violet"> Zwrócone</label>
                    <Table>
                        <thead>
                        <tr>
                            <th>id detali auta</th>
                            <th>token</th>
                            <th>Zatwierdzono</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ReturnedCars.map(rc=>
                            <tr key={rc.carDetailsID}>
                                <td>{rc.carDetailsID}</td>
                                <td>{rc.rentToken}</td>
                                <td> nie/tak</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button>
                                            Szczegóły
                                        </Button>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                            )
                        }
                        </tbody>
                    </Table>
                </div>
                }
            </div>
        </div>
        )
    }
}