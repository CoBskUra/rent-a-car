import React,{Component} from 'react';
import {Table} from 'react-bootstrap';


export class Cars extends Component{

    constructor(props){
        super(props);
        this.state={cars:[]}
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
        const {cars}=this.state;
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
                                <td>edit</td>

                            </tr>)}
                    </tbody>

                </Table>

            </div>
        )
    }
}