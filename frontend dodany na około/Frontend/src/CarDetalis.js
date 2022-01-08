import { waitFor } from '@testing-library/react';
import React,{Component} from 'react';
import {Table} from 'react-bootstrap';


export class CarDetalis extends Component{

    constructor(props){
        super(props);
        this.state={detalis:null, wait:true}
    }

    async refreshList(){
        await fetch(process.env.REACT_APP_API +'/JsonCars/Details/'+1)
        .then(response=>response.json())
        .then(data=>{
            this.setState({detalis:data, wait:false});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        if(this.state.wait)
            return(<div></div>);
        const {detalis} = this.state;
        
        return(
            <div>
                <div>
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
                        <tr key={detalis.Car.CarID}>
                                    <td>{detalis.Car.CarID}</td>
                                    <td>{detalis.Car.Brand}</td>
                                    <td>{detalis.Car.Model}</td>
                                    <td>{detalis.Car.HorsePower}</td>
                        </tr>
                        </tbody>

                    </Table>

                    </div>
                    <div>
                        <Table className="mt-4" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Nazwa firmy</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {detalis.Companies.map(company => <tr key={company.CompanyID}>
                                    <td>{company.Name}</td>
                                    <td>pokaż auta firmy</td>

                                </tr>)}
                            </tbody>

                    </Table>

                    </div>
                </div>
        );
    }
}