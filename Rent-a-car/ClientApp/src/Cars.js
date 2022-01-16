import React,{Component} from 'react';
import { Form, Table, Col, Row, FormGroup, Label, Input} from 'reactstrap';

import {Button,ButtonToolbar} from 'reactstrap';
import  EditCar  from './Forms/EditCar';
import CarDetalisWindow from './CarDetalisWindow';

export default class Cars extends Component{

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
                    <Form >
                        <Col sm={4}>
                            <FormGroup controlId="Brand">
                                <Label>Firma</Label>
                                <Input type="text" name="Brand"
                                    placeholder="Firma" />
                            </FormGroup>

                            <FormGroup controlId="Mark">
                                <Label>Marka</Label>
                                <Input type="text" name="Mark"
                                    placeholder="Marka" />
                            </FormGroup>
                        </Col>

                        <Row>

                            <FormGroup>
                                <Button variant="primary" type="submit">
                                    Szukaj
                                </Button>

                                <Button variant="secondary"
                                    onClick={() => {
                                        if (this.state.order === 0)
                                            this.setState({ order: 1 })
                                        else
                                            this.setState({ order: 0 })
                                    }

                                    }>
                                    Zmień kolejność wyświetlania
                                </Button>

                            </FormGroup>




                        </Row>

                    </Form>
                </div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>HorsePower</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car=>
                            <tr key={car.carID}>
                                <td>{car.brand}</td>
                                <td>{car.model}</td>
                                <td>{car.horsePower}</td>
                                <td> 
                                    <ButtonToolbar>
                                      
                                            <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState(
                                            {
                                                carDetalisModalShow:true,
                                                carID:car.carID
                                            })}>
                                                Szczegóły
                                            </Button>

                                            
                                            


                                        <CarDetalisWindow isOpen={this.state.carDetalisModalShow}
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