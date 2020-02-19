import React, {Component} from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    };

    orderHandler = (event) => {
        event.preventDefault();
        

        this.setState({
            loading: true,
        });

        axios.post('/orders.json', {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Rick",
                address: {
                    street: '123 Main St.',
                    zipCode: '12345',
                    country: 'US'
                },
                email: 'test@example.com',
            },
            deliverMethod: 'fastest',
        })
        .then(response => {
            this.setState({ loading: false });
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({ loading: false });
        });
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="email" name="name" placeholder="Your Email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="number" name="zip" placeholder="Zip" />
                <Button buttonType="Success" clicked={ this.orderHandler }>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Contact Information</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
