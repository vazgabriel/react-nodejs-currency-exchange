import React, { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Layout from '../../components/Layout/Layout';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className='my-5'>
        <h2>{t('About')} Money Exchange</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odio
          officia, perspiciatis, ullam omnis sequi odit ea facilis magnam autem
          iusto nesciunt aspernatur consequatur quibusdam! Natus dolores
          possimus culpa dicta nam tempore, reiciendis, dolore ullam error rem
          iure ea facere velit a unde asperiores doloremque eaque autem
          consectetur nihil enim.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odio
          officia, perspiciatis, ullam omnis sequi odit ea facilis magnam autem
          iusto nesciunt aspernatur consequatur quibusdam! Natus dolores
          possimus culpa dicta nam tempore, reiciendis, dolore ullam error rem
          iure ea facere velit a unde asperiores doloremque eaque autem
          consectetur nihil enim.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odio
          officia, perspiciatis, ullam omnis sequi odit ea facilis magnam autem
          iusto nesciunt aspernatur consequatur quibusdam! Natus dolores
          possimus culpa dicta nam tempore, reiciendis, dolore ullam error rem
          iure ea facere velit a unde asperiores doloremque eaque autem
          consectetur nihil enim.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odio
          officia, perspiciatis, ullam omnis sequi odit ea facilis magnam autem
          iusto nesciunt aspernatur consequatur quibusdam! Natus dolores
          possimus culpa dicta nam tempore, reiciendis, dolore ullam error rem
          iure ea facere velit a unde asperiores doloremque eaque autem
          consectetur nihil enim.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odio
          officia, perspiciatis, ullam omnis sequi odit ea facilis magnam autem
          iusto nesciunt aspernatur consequatur quibusdam! Natus dolores
          possimus culpa dicta nam tempore, reiciendis, dolore ullam error rem
          iure ea facere velit a unde asperiores doloremque eaque autem
          consectetur nihil enim.
        </p>
      </div>
    </Layout>
  );
};

const AboutSuspense: React.FC = props => (
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
    <About {...props} />
  </Suspense>
);

export default AboutSuspense;
