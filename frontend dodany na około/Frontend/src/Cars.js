import React,{Component} from 'react';
import {Form, Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {EditCar} from './Forms/EditCar';
import {CarDetalisWindow} from './CarDetalisWindow';

export class Cars extends Component{

    constructor(props){
        super(props);
        this.state={
            cars:[],
            editModalShow:false,
            carDetalisModalShow:false,
            Brand:null,
            Mark:null,
            order:0
        }

        this.handleSubmit=this.handleSubmit.bind(this);
    }

    refreshList(){
        fetch(process.env.REACT_APP_API +'/JsonCars',{
            method:'Post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Mark: this.state.Mark,
                Brand: this.state.Brand,
                order: this.state.order
            })
        })
        .then(response=>response.json())
        .then(data=>{
           
            this.setState({cars:data});
        });
    }


    handleSubmit(event){
        event.preventDefault();
        var m = event.target.Mark.value;
        if(m==='')
            m = null;
        var b = event.target.Brand.value;
        if(b === '')
            b = null;
        
        this.setState(
        {
            Mark:m,
            Brand:b
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
                <div>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="Brand">
                    <Form.Label>Firma</Form.Label>
                        <Form.Control type="text" name="Brand"
                        placeholder="Firma"/>
                </Form.Group>   

                <Form.Group controlId="Mark">
                    <Form.Label>Marka</Form.Label>
                        <Form.Control type="text" name="Mark"
                        placeholder="Marka"/>
                </Form.Group>   


                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Szukaj
                        </Button>
                    </Form.Group>

                    <Button variant="secondary" 
                    onClick={()=>{
                        if(this.state.order === 0)
                            this.setState({ order: 1})
                        else
                            this.setState({ order: 0})
                    }
                        
                    }>
                        Zmień kolejność wyświetlania
                    </Button>
                </Form>
                </div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>CarID</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>HorsePower</th>
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
                                                carid:car.CarID
                                            })}>
                                                szczegóły
                                            </Button>

                                            
                                            
                                            <EditCar show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            carid={carid}
                                            carbrand={carbrand}
                                            carmodel={carmodel}
                                            carhorsePower={carhorsePower}
                                            />

                                            <CarDetalisWindow show={this.state.carDetalisModalShow}
                                            onHide={CarDetalisModalClose}
                                            id={carid}
                                            />



                                    </ButtonToolbar>
                                    

                                </td>

                            </tr>
                            
                        )}
                    </tbody>

                </Table>

            </div>
        )
    }
}