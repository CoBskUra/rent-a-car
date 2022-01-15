import React,{Component} from 'react';
import {Form, Table, Col, Row} from 'reactstrap';

import {Button,ButtonToolbar} from 'reactstrap';
import { EditCar } from './Forms/EditCar';
import CarDetalisWindow from './CarDetalisWindow';

export class Cars extends Component{

    constructor(props){
        super(props);
        this.state={
            cars:[],
            editModalShow:false,
            carDetalisModalShow:false,
            Brand:null,
            Model:null,
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
                Model: this.state.Model,
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
        console.log(this.state);
        this.setState(
        {
            Mark:m,
            Brand:b
        });
    }


    componentDidMount(){
        this.refreshList();
        this.interval = setInterval(() => this.refreshList(), 2000);
        
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render(){
        const {cars, carID, carbrand, carmodel, carhorsePower}=this.state;
        let editModalClose=()=>this.setState({editModalShow:false});
        let CarDetalisModalClose=()=>this.setState({carDetalisModalShow:false});
        return(
            <div >
                <div>
                <Form onSubmit={this.handleSubmit}>
                    <Col sm={4}>
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
                </Col> 

                <Row>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Szukaj
                        </Button>

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

                    </Form.Group>

                    

                    
                    </Row>
                </Form>
                </div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>carID</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>HorsePower</th>
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
                                                carID:car.carID,
                                                carbrand:car.brand,
                                                carmodel:car.model,
                                                carhorsePower:car.horsePower
                                            })}>
                                                Edytuj
                                            </Button>
                                            <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState(
                                            {
                                                carDetalisModalShow:true,
                                                carID:car.carID
                                            })}>
                                                szczegóły
                                            </Button>

                                            
                                            
                                            <EditCar show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            carID={carID}
                                            carbrand={carbrand}
                                            carmodel={carmodel}
                                            carhorsePower={carhorsePower}
                                            />

                                            <CarDetalisWindow show={this.state.carDetalisModalShow}
                                            onHide={CarDetalisModalClose}
                                            id={carID}
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