import React,{Component} from 'react';
import {Table} from 'react-bootstrap';


export class CarDetalis extends Component{

    constructor(props){
        super(props);
        this.state={detalis:undefined}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API +'/JsonCars/Details/'+1)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            console.log(data.Companies);
            this.setState({detalis:data});
            console.log(this.state.detalis);
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        this.refreshList();
        const {detalis}=this.state;
        const {car} = detalis.Car;
        return(
            <><div>
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
                    <tr key={car.CarID}>
                                <td>{car.CarID}</td>
                                <td>{car.Brand}</td>
                                <td>{car.Model}</td>
                                <td>{car.HorsePower}</td>
                    </tr>
                    </tbody>

                </Table>

            </div><div>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Nazwa firmy</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalis.Companies.map(company => <tr key={company.CompanyID}>
                                <td>{car.Name}</td>
                                <td>pokaż auta firmy</td>

                            </tr>)}
                        </tbody>

                   </Table>

                </div></>
        );
    }
}