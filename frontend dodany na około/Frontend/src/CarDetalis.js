import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import { CompanysCars } from './CompanysCars';
import {Button} from 'react-bootstrap';

export class CarDetalis extends Component{

    constructor(props){
        super(props);
        this.state={detalis:undefined, wait:true, shower:[]}
    }

    async refreshList(){
        await fetch(process.env.REACT_APP_API +'/JsonCars/Details/'+this.props.id)
        .then(response=>response.json())
        .then(data=>{
            this.setState({detalis:data, wait:false });
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
    }

    onRemoveItem = i => {
        this.setState(state => {
            const shower = state.shower.filter(j => i !== j);
      
            return {
                shower,
            };
          });
        };

        onAddItem = i => {
          this.setState(state => {
            const shower = state.shower.concat(i);
      
            return {
              shower
            };
          });
        };

      should_be_show = i =>{
        var should_be_show = false;
        this.state.shower.map( s =>{
            if(s===i)
            {
                should_be_show = true;
            }
        });
        return should_be_show;
      };

    show_or_hide = i =>{
        if(this.should_be_show(i))
            this.onRemoveItem(i);
        else
            this.onAddItem(i);
    };

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
                                
                                {detalis.Companies.map(company =>
                                <Table>
                                <tr key={company.CompanyID}>
                                    <td>{company.Name}</td>
                                    <td><Button className="mr-2" variant="info"
                                            onClick={()=> this.show_or_hide(company.CompanyID)}>
                                                Wyświetl auta firmy
                                            </Button>
                                    </td>
                                    
                                </tr>
                                <tr><CompanysCars show={this.should_be_show(company.CompanyID)} companyID={company.CompanyID} carID={detalis.Car.CarID}></CompanysCars></tr>
                                </Table>
                            )}

                    </Table>
                        
                    </div>
                </div>
        );
    }
}