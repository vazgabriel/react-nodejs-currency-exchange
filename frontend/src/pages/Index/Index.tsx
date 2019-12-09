import React, { Suspense, useCallback, useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import { differenceInMinutes } from 'date-fns';
import api from '../../api';
import Layout from '../../components/Layout/Layout';
import './Index.scss';

const Index: React.FC = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState<string | number | undefined>(undefined);
  const [result, setResult] = useState<string | number | undefined>(undefined);
  const [control, setControl] = useState({
    loading: false,
    error: '',
  });
  const [lastRequest, setLastRequest] = useState<{
    lastValue: number;
    lastResult: number;
    lastRequestTime?: Date;
  }>({
    lastValue: 0,
    lastResult: 0,
    lastRequestTime: undefined,
  });

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!value) return;

      setControl({
        loading: true,
        error: '',
      });

      try {
        /**
         * Check if the last request has the same value and
         * was done less than 10 minutes ago (Also has cache on backend)
         */
        if (
          parseFloat(value.toString()) === lastRequest.lastValue &&
          !!lastRequest.lastRequestTime &&
          differenceInMinutes(new Date(), lastRequest.lastRequestTime) < 10
        ) {
          setControl({
            loading: false,
            error: '',
          });
          return;
        }

        /**
         * Params (Currencies Ids):
         * from = 1 (Dolar)
         * to = 2 (Euro)
         * Later, will be possible to change it to be dynamically
         */
        const response = await api.get(
          `currencies/value?from=1&to=2&value=${value}`,
          {
            headers: {
              'Accept-Language':
                localStorage.getItem('i18nextLng') === 'es' ? 'es-ES' : 'en-US',
            },
          }
        );

        setResult(response.data.value);
        setLastRequest({
          lastValue: parseFloat(value.toString()),
          lastResult: response.data.value as number,
          lastRequestTime: new Date(),
        });
        setControl({
          loading: false,
          error: '',
        });
      } catch (error) {
        const errorMessage =
          parseInt(error.code) === 0
            ? t('CONNECT_ERROR')
            : !!error.response &&
              !!error.response.data &&
              !!error.response.data.message
            ? error.response.data.message
            : error.message;

        setControl({
          loading: false,
          error:
            errorMessage === 'Network Error'
              ? t('CONNECT_ERROR')
              : errorMessage,
        });
      }
    },
    [lastRequest, t, value]
  );

  return (
    <Layout ignoreContainer>
      <div className='calculator my-3'>
        <Form onSubmit={onSubmit} className='container'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-12 col-md-6'>
              <NumberFormat
                value={value}
                allowNegative={false}
                thousandSeparator
                decimalScale={4}
                prefix={'$ '}
                onValueChange={v => {
                  setValue(v.floatValue);

                  if (!!result) {
                    setResult('');
                  }
                }}
                placeholder='USD'
                className='w-100 input-calculate'
              />
            </div>
            <div className='col-12 col-md-6'>
              <NumberFormat
                value={result}
                allowNegative={false}
                thousandSeparator
                decimalScale={4}
                prefix={'€ '}
                placeholder='EU'
                className='w-100 input-calculate'
                disabled
              />
            </div>
            <div className='col-12'>
              {!!control.error && (
                <div className='my-3 mx-auto d-table'>
                  <Alert variant='danger'>{control.error}</Alert>
                </div>
              )}
              <div className='my-3 mx-auto d-table'>
                {control.loading ? (
                  <Spinner animation='border' />
                ) : (
                  <Button
                    type='submit'
                    className='btn-calculate'
                    disabled={!value || control.loading}
                  >
                    {t('CALCULATE')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

const IndexSuspense: React.FC = props => (
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
    <Index {...props} />
  </Suspense>
);

export default IndexSuspense;
