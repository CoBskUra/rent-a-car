import React,{Component} from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';

export class Worker extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            ReadyShow:false,
            ReadyToReturn:[],
            NotReadyShow:false,
            NotReadyToReturn:[]
        }
    }

    dowlandReadyToReturn(){
        if(this.state.ReadyShow)
        {
            fetch(process.env.REACT_APP_API +'/Api/ReadyToReturn')
            .then(response=>response.json())
            .then(data=>{
                this.setState({ReadyToReturn:data});
            });
        }
    }

    dowlandNotReadyToReturn(){
        if(this.state.NotReadyShow)
        {
            fetch(process.env.REACT_APP_API +'/Api/NotReadyToReturn')
            .then(response=>response.json())
            .then(data=>{
                this.setState({NotReadyToReturn:data});
            });
        }
    }

    componentDidMount(){
        this.dowlandNotReadyToReturn();
        this.dowlandReadyToReturn();
    }

    componentDidUpdate(){
        this.dowlandNotReadyToReturn();
        this.dowlandReadyToReturn();
    }

    render(){
        const {ReadyToReturn, NotReadyToReturn} = this.state;
        return(
            <div>
                <ButtonToolbar>
                    <Button onClick={()=>this.setState({ReadyShow:!this.state.ReadyShow})}>
                        Pokaż auta gotowe do zwrotu
                    </Button>

                    <Button onClick={()=>this.setState({NotReadyShow:!this.state.NotReadyShow})}>
                        Pokaż auta niegotowe do zwrotu
                    </Button>

                </ButtonToolbar>
                <div>
                { this.state.ReadyShow &&
                    <div>
                        <label aria-setsize={40} color="violet"> Gotowe do zwrotu</label>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Marka</th>
                                <th>Model</th>
                                <th>ID klienta</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ReadyToReturn.map(r=>
                                <tr key={r.RentID}>
                                    <td>{r.RentID}</td>
                                    <td>{r.Brand}</td>
                                    <td>{r.Model}</td>
                                    <td>{r.CustomerID}</td>
                                    <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="dark" 
                                        onClick={()=>{
                                            this.setState({
                                                ShowReturnForm:true
                                            })
                                        }}>
                                            Zwróć
                                        </Button>
                                        
                                        
                                    </ButtonToolbar>
                                    </td>
                                </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                    }
                </div>
                <div>
                    { this.state.NotReadyShow &&
                    <div>
                        <label aria-setsize={40} color="violet"> Oczekują na wysłanie protokołu przez klijenta</label>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Marka</th>
                                <th>Model</th>
                                <th>ID klienta</th>
                            </tr>
                            </thead>
                            <tbody>
                            {NotReadyToReturn.map(r=>
                                <tr key={r.RentID}>
                                    <td>{r.RentID}</td>
                                    <td>{r.Brand}</td>
                                    <td>{r.Model}</td>
                                    <td>{r.CustomerID}</td>
                                    <td>
                                    <ButtonToolbar>
                                        
                                        
                                    </ButtonToolbar>
                                    </td>
                                </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                    }
                </div>
            </div>
        )
    }
}