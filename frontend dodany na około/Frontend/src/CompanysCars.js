import React,{Component} from 'react';
import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import { CheckPriceForm } from './CheckPriceForm';

export class CompanysCars extends Component{

    constructor(props){
        super(props);
        this.state={
            details:[], checkPrice:false, PriceShower:[]

        };
    }

    refreshList()
    {
        if(this.props.show)
        {
            fetch(process.env.REACT_APP_API +'/JsonCars/GetCompanysCars/'+this.props.companyID +'?CarID='+this.props.carID)
            .then(response=>response.json())
            .then(data=>{
                this.setState({details:data});
            });
            console.log(this.state);
        }
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    onRemoveItem = i => {
        this.setState(state => {
            const PriceShower = state.PriceShower.filter(item => item[0] !== i);
      
            return {
                PriceShower,
            };
          });
        };

        onAddItem (id, price) {
          this.setState(state => {
            var item = [id, price];
            const PriceShower = state.PriceShower.concat(item);
      
            return {
                PriceShower
            };
          });
        }

        exsist (i){
        var should_be_show = false;
        this.state.PriceShower.map( s =>{
            if(s[0]===i)
            {
                should_be_show = true;
            }
        });
        return should_be_show;
      }

      show_price(i){
      }


    savePrice(CarDetalisID, Price){
        if(this.exsist(CarDetalisID))
            this.onRemoveItem(CarDetalisID);
        
        this.onAddItem(CarDetalisID, Price);
        
            console.log(this.state);
    }



    render(){

        if(this.props.show)
        {
            const {details}=this.state;
            let ModalCheckPriceClose=()=>this.setState({checkPrice:false});
            let exsist = (i)=>{
                var should_be_show = false;
                this.state.PriceShower.map( s =>{
                    if(s[0]===i)
                    {
                        should_be_show = true;
                    }
                });
                return should_be_show;
              };

            let onAddItem = (id, price) => {
                this.setState(state => {
                  var item = [id, price];
                  const PriceShower = state.PriceShower.concat(item);
            
                  return {
                      PriceShower
                  };
                });
              };

            let onRemoveItem = i => {
                this.setState(state => {
                    const PriceShower = state.PriceShower.filter(item => item[0] !== i);
              
                    return {
                        PriceShower,
                    };
                  });
                };
            
            return(
                <div>
                    <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Rok Produkcji</th>
                            <th>Opis</th>
                            <th>Cena</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map(detal=>
                            <tr key={detal.CarDetailsID}>
                                <td>{detal.YearOfProduction}</td>
                                <td>{detal.Description}</td>
                                <td></td>
                                <td> 
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                                onClick={()=>this.setState(
                                                {
                                                    checkPrice:true,
                                                    carDetalisID:detal.CarDetailsID
                                                })}>
                                                    Sprawdć cene 
                                        </Button> 

                                        <CheckPriceForm show={this.state.checkPrice}
                                        onHide={ModalCheckPriceClose}
                                        carDetalisID={detal.CarDetailsID}
                                        exsist={exsist}
                                        onRemoveItem={onRemoveItem}
                                        onAddItem={onAddItem}
                                        savePrice={this.savePrice}
                                                />
                                    </ButtonToolbar>
                                </td>
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