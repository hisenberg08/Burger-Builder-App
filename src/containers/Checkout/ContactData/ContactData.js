import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input'


class ContactData extends Component {

	state = {
		orderForm:{
            name : {
            	elementType:'input',
            	elementConfig:{
            		type:'text',
            		placeholder:'Your Name'
            	},
            value:'',
            vaildation:{
            	required:true,
            	minLength:5,
            	maxLength:10
            },
            valid:false,
            touched:false
            },
            street:{
            	elementType:'input',
            	elementConfig:{
            		type:'text',
            		placeholder:'Street'
            	},
            value:'',
            vaildation:{
            	required:true
            },
            valid:false,
            touched:false
            },
            zipcode: {
            	elementType:'input',
            	elementConfig:{
            		type:'text',
            		placeholder:'Zip Code'
            	},
            value:'',vaildation:{
            	required:true,
            	minLength:5,
            	maxLength:5
            },
            valid:false
            },
            country : {
            	elementType:'input',
            	elementConfig:{
            		type:'text',
            		placeholder:'Country'
            	},
            value:'',
            vaildation:{
            	required:true
            },
            valid:false,
            touched:false
            },
            email: {
            	elementType:'input',
            	elementConfig:{
            		type:'email',
            		placeholder:'Your Email'
            	},
            value:'',
            vaildation:{
            	required:true
            },
            valid:false,
            touched:false
            },    
            deliveryMethod: {
            	elementType:'select',
            	elementConfig:{
            		options:[
            		{value: 'fastest', displayValue:'Fastest'},
            		{value: 'cheapest', displayValue:'Cheapest'}
            		]
            	},
            value:'Fastest',
            vaildation:{},
            valid:true
            },
            },
		loading:false,
		formIsValid:false
	}

	orderHandler = (event) => {
		
		event.preventDefault();	
		this.setState({loading:true});
        
        const formData = {};

        for(let formElementIdentifier in this.state.orderForm){
        	formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {

            ingredients : this.props.ingredients,
            totalPrice : this.props.price,
            date:new Date().toLocaleString(),
            orderData: formData
        }

        axios.post('/orders.json',order)
            .then(response => {
                this.setState({loading:false});
                this.props.history.push('/');    
            })
            .catch(error => {
                console.log(error)
                this.setState({loading:false});
            });
	}

	inputChangedHandler = (event, inputIdentifier) => {

		const updatedOrderForm = {
			...this.state.orderForm
		};
		
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};

		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.vaildation)
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		//console.log(updatedOrderForm);

		let formIsValid =true;

		for(let inputIdentifier in updatedOrderForm){
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
	}

	checkValidity(value,rules) {

		let isValid = true;

		if(rules.required){
			isValid = value.trim() !== '' && isValid;
		}

		if(rules.minLength){
			isValid =  value.length >= rules.minLength && isValid;
		}

		if(rules.maxLength){
			isValid =  value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	render(){

		const formElementsArray = [];
		for(let key in this.state.orderForm){

			formElementsArray.push({
				id:key,
				config:this.state.orderForm[key]
			});
		}
		
		let form =(
				<form onSubmit={this.orderHandler}>
					{formElementsArray.map(formElement => (
						<Input
							key = {formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid = {!formElement.config.valid}
							shouldValidate = {formElement.config.vaildation}
							touched = {formElement.config.touched}
							changed={(event) => this.inputChangedHandler(event,formElement.id)}
						/>
					))}
					<Button clicked= {this.orderHandler} btnType="Success" disabled={!this.state.formIsValid}> ORDER</Button>
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