import React, { Suspense } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Layout from '../../components/Layout/Layout';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className='my-5'>
        <h2>{t('Contact')} Money Exchange</h2>
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
            alert(t('Thank to contact us!'));
          }}
        >
          <Form.Group as={Row} controlId='name'>
            <Form.Label column sm={2}>
              {t('Name')}
            </Form.Label>
            <Col sm={10}>
              <Form.Control type='name' placeholder={t('Name')} required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='email'>
            <Form.Label column sm={2}>
              {t('Email')}
            </Form.Label>
            <Col sm={10}>
              <Form.Control type='email' placeholder={t('Email')} required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='message'>
            <Form.Label column sm={2}>
              {t('Message')}
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as='textarea'
                rows='5'
                placeholder={t('Your Message')}
                required
              />
            </Col>
          </Form.Group>
          <div className='my-3 mx-auto d-table'>
            <Button type='submit'>{t('Submit form')}</Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

const ContactSuspense: React.FC = props => (
  <Suspense
    fallback={
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ width: '100vw', height: '100vh' }}
      >
        <Spinner animation='border' />
      </div>
    }
  >
    <Contact {...props} />
  </Suspense>
);

export default ContactSuspense;
