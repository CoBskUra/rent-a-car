import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

export class CompanysCars extends Component{

    constructor(props){
        super(props);
        this.state={detalis:[]};
    }

    refreshList()
    {
        if(false)
        {
            fetch(process.env.REACT_APP_API +'/JsonCars' + '/GetCompanysCars'+'/'+this.props.companyID +'/'+this.props.carID)
            .then(response=>response.json())
            .then(data=>{
                this.setState({detalis:data});
            });
        }
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){

        if(this.props.show)
        {
            const {detalis}=this.state;
            return(
                <div>
                    <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Rok Produkcji</th>
                            <th>Opis</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detalis.map(detal=>
                            <tr key={detal.CarDetailsID}>
                                <td>{detal.YearOfProduction}</td>
                                <td>{detal.Description}</td>
                            </tr>
                        ) }
                    </tbody>
                    </Table>
                </div>
            )
        }
        else
            return(<p></p>)
    }
}