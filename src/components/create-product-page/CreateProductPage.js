import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class CreateProductPage extends Component {
  constructor(props) {
    super(props);
    this.State = {
      Brand: '',
      Category: '',
      Demographic: '',
      Description: ''

    };
  }

    handleInput = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    handleSumbit = (event) => {
      event.preventDefault();
    }

    render() {
      return (
        <Form onSubmit={this.handleSumbit}>
          <Form.Control type="text" name="Brand" value={Brand} onChange={this.handleInput} />
          <Form.Control type="text" name="Category" value={Category} onChange={this.handleInput} />
          <Form.Control type="text" name="Demographic" value={Demographic} onChange={this.handleInput} />
          <Form.Control type="text" name="Description" value={Description} onChange={this.handleInput} />
          <Form.Control type="text" name="ImageSrc" value={ImageSrc} onChange={this.handleInput} />
          <Form.Control type="text" name="Material" value={Material} onChange={this.handleInput} />
          <Form.Control type="text" name="Name" value={Name} onChange={this.handleInput} />
          <Form.Control type="text" name="Price" value={Price} onChange={this.handleInput} />
          <Form.Control type="text" name="PrimaryColorCode" value={PrimaryColorCode} onChange={this.handleInput} />
          <Form.Control type="text" name="SecondaryColorCode" value={SecondaryColorCode} onChange={this.handleInput} />
          <Form.Control type="text" name="Quantity" value={Quantity} onChange={this.handleInput} />
          <Form.Control type="text" name="ReleaseDate" value={ReleaseDate} onChange={this.handleInput} />
          <Form.Control type="text" name="Type" value={Type} onChange={this.handleInput} />
        </Form>
      );
    }
}

export default CreateProductPage;
