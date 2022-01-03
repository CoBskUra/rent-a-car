import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {EditCar} from './EditCar';


export class Cars extends Component{

    constructor(props){
        super(props);
        this.state={cars:[], editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:27116/JsonCars')
        .then(response=>response.json())
        .then(data=>{
           
            this.setState({cars:data});
        });
    }



    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {cars, carid, carbrand, carmodel, carhorsePower}=this.state;
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>CarID</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>HorsePower</th>
                            <th>option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car=>
                            <tr key={car.carID}>
                                <td>{car.carID}</td>
                                <td>{car.brand}</td>
                                <td>{car.model}</td>
                                <td>{car.horsePower}</td>
                                <td> 
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState(
                                            {
                                                editModalShow:true,
                                                carid:car.carID,
                                                carbrand:car.brand,
                                                carmodel:car.model,
                                                carhorsePower:car.horsePower
                                            })}>
                                                Edytuj
                                            </Button>

                                            <EditCar show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            carid={carid}
                                            carbrand={carbrand}
                                            carmodel={carmodel}
                                            carhorsePower={carhorsePower}
                                            
                                            />
                                    </ButtonToolbar>
                                </td>

                            </tr>)}
                    </tbody>

                </Table>

            </div>
        )
    }
}