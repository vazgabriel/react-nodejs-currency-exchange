import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Form, Col, Row, Button } from 'react-bootstrap';

const Contact: React.FC = () => {
  return (
    <Layout>
      <div className='my-5'>
        <h2>Contact Money Exchange</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odio
          officia, perspiciatis, ullam omnis sequi odit ea facilis magnam autem
          iusto nesciunt aspernatur consequatur quibusdam! Natus dolores
          possimus culpa dicta nam tempore, reiciendis, dolore ullam error rem
          iure ea facere velit a unde asperiores doloremque eaque autem
          consectetur nihil enim.
        </p>
        <Form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            console.log('here');
            alert('Thank to contact us!');
          }}
        >
          <Form.Group as={Row} controlId='name'>
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type='name' placeholder='Name' required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='email'>
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type='email' placeholder='Email' required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='message'>
            <Form.Label column sm={2}>
              Message
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as='textarea'
                rows='5'
                placeholder='Your Message'
                required
              />
            </Col>
          </Form.Group>
          <div className='my-3 mx-auto d-table'>
            <Button type='submit'>Submit form</Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Contact;
