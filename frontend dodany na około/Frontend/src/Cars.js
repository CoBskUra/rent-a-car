import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {EditCar} from './EditCar';

export class Cars extends Component{

    constructor(props){
        super(props);
        this.state={cars:[], editModalShow:false, carDetalisModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API +'/JsonCars')
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
        let CarDetalisModalClose=()=>this.setState({carDetalisModalShow:false});
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
                            <tr key={car.CarID}>
                                <td>{car.CarID}</td>
                                <td>{car.Brand}</td>
                                <td>{car.Model}</td>
                                <td>{car.HorsePower}</td>
                                <td> 
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState(
                                            {
                                                editModalShow:true,
                                                carid:car.CarID,
                                                carbrand:car.Brand,
                                                carmodel:car.Model,
                                                carhorsePower:car.HorsePower
                                            })}>
                                                Edytuj
                                            </Button>

                                            <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState(
                                            {
                                                carDetalisModalShow:true,
                                                carid:car.CarID,
                                            })}>
                                                detalis
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