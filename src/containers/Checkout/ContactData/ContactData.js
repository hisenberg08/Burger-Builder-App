import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {

	state = {

		name: '',
		email:'',
		address: {

			street: '',
			postolCode:''
		},

		loading:false
	}

	orderHandler = (event) => {
		
		event.preventDefault();	
		this.setState({loading:true});
        const order = {

            ingredients : this.props.ingredients,
            totalPrice : this.props.price,
            customer : {
                name : 'Vaibhav Lodha',
                address: {
                    street:'street',
                    zipcode: '11221',
                    country : 'USA'
                },
                
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest',
            date:new Date().toLocaleString()
        }

        axios.post('/orders.json',order)
            .then(response => {
                console.log(response);
                this.setState({loading:false});
                //alert('order placed successfully');
                this.props.history.push('/');    
            })
            .catch(error => {
                console.log(error)
                this.setState({loading:false});
            });
	}

	render(){

		let form =(
				<form>
					<input className = "Input" type="text" name="name" placeholder="Your Name" />
					<input className = "Input" type="text" name="email" placeholder="Your Email" />
					<input className = "Input" type="text" name="street" placeholder="Street" />
					<input className = "Input" type="text" name="postal" placeholder="Postal Code" />
					<Button clicked= {this.orderHandler} btnType="Success"> ORDER</Button>
				</form>
			);

		if(this.state.loading){
			form = <Spinner />
		}

		return(

			<div className= {classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>

			);
	}

}

export default ContactData;