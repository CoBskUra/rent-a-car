import React,{Component} from 'react';
import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import { CheckPriceForm } from './Forms/CheckPriceForm';
import { RentMeForm } from './RentMeForm';

export class CompanysCars extends Component{

    constructor(props){
        super(props);
        this.state={
            details:[],
            checkPrice:false,
            PriceShower:[],
            Rent:false

        };
    }

    refreshList()
    {
        if(this.props.show)
        {
            fetch(process.env.REACT_APP_API +'/JsonCars/GetCompanysCars/'+this.props.companyID +'?carID='+this.props.carID)
            .then(response=>response.json())
            .then(data=>{
                this.setState({details:data});
            });
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
            const PriceShower = state.PriceShower.filter(item => item.Key !== i);
      
            return {
                PriceShower,
            };
          });
        };

        onAddItem (id, price) {
          this.setState(state => {
            
            var item = { Key: id, Price:price};
            console.log(item);
            const PriceShower = state.PriceShower.concat(item);
      
            return {
                PriceShower
            };
          });
        }

        exsist (i){
        var should_be_show = false;
        this.state.PriceShower.map( s =>{
            if(s.Key===i)
            {
                should_be_show = true;
            }
        });
        return should_be_show;
      }

      show_price(i){
          var price = -1;
          this.state.PriceShower.map(s=>{
            if(s.Key===i)
            {
                price = s.Price;
            }});
            if(price===-1)
                return null;
            else
                return price;
      }


    savePrice(CarDetalisID, Price){
        if(this.exsist(CarDetalisID))
            this.onRemoveItem(CarDetalisID);
        
        this.onAddItem(CarDetalisID, Price);
        
    }



    render(){

        if(this.props.show)
        {
            const {details}=this.state;

            let ModalCheckPriceClose=()=>this.setState({checkPrice:false});
            let ModalRentClose=()=>this.setState({Rent:false});


            let exsist = (i)=>{
                var should_be_show = false;
                this.state.PriceShower.map( s =>{
                    if(s.Key===i)
                    {
                        should_be_show = true;
                    }
                });
                return should_be_show;
              };

            let onAddItem = (id, price) => {
                this.setState(state => {
                    var item = { Key: id, Price:price};
                    const PriceShower = state.PriceShower.concat(item);
            
                  return {
                      PriceShower
                  };
                });
              };

            let onRemoveItem = i => {
                this.setState(state => {
                    const PriceShower = state.PriceShower.filter(item => item.Key !== i);
              
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
                            <th>Cena za dzień</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map(detal=>
                            <tr key={detal.CarDetailsID}>
                                <td>{detal.YearOfProduction}</td>
                                <td>{detal.Description}</td>
                                <td>{this.show_price(detal.CarDetailsID)}</td>
                                <td> 
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                                onClick={()=>this.setState(
                                                {
                                                    checkPrice:true
                                                })}>
                                                    Sprawdć cene 
                                        </Button> 

                                        
                                        {
                                            this.show_price(detal.CarDetailsID)!=null && 
                                            <Button className="mr-2" variant="success" 
                                                onClick={()=> this.setState({Rent:detal.CarDetailsID})}> 
                                                Wynajmij mnie
                                            </Button>
                                        }
                                        

                                        <CheckPriceForm show={this.state.checkPrice}
                                        onHide={ModalCheckPriceClose}
                                        carDetalisID={detal.carDetailsID}
                                        exsist={exsist}
                                        onRemoveItem={onRemoveItem}
                                        onAddItem={onAddItem}
                                        savePrice={this.savePrice}/>

                                        <RentMeForm show={this.state.Rent} 
                                        onHide={ModalRentClose}
                                        carDetalisID={detal.CarDetailsID}/>
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

