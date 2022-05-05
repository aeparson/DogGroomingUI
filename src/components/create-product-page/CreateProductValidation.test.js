import ReactDOM from 'react-dom';
import validateProductCreation from './CreateProductValidation';
import CreateProductPage from './CreateProductPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(CreateProductPage, div);
});

describe('Create Product Page Validation Tests', () => {
  const validProduct = {
    name: 'Name',
    brand: 'Nike',
    category: 'soccer',
    type: 'Shoes',
    material: 'leather',
    descriptions: 'handsome',
    demographic: 'Men',
    price: '5.00',
    quantity: '5',
    primaryColorCode: '#456782',
    secondaryColorCode: '#123456',
    styleNumber: 'SC12345',
    releaseDate: '12/12/1212',
    imageSrc: 'image.com'

  };
  it('returns Required for each empty required field', () => {
    expect(validateProductCreation(validProduct, { brand: 'Nike' }, { name: undefined }.toEqual(
      [
        {},
        {
          name: 'Required'
        }
      ]
    )));
  });
});
