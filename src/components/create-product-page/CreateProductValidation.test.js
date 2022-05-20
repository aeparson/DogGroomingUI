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
    description: 'handsome',
    demographic: 'Men',
    price: '5.00',
    quantity: '5',
    primaryColorCode: '#456782',
    secondaryColorCode: '#123456',
    styleNumber: 'scKHJKS',
    releaseDate: '12/12/1212',
    imageSrc: 'image.com',
    active: 'active'
  };

  it('returns This field is required for each empty required field', () => {
    // When every field is empty
    expect(validateProductCreation({
      name: '',
      brand: '',
      category: '',
      type: '',
      material: '',
      description: '',
      demographic: '',
      price: '',
      quantity: '',
      primaryColorCode: '',
      secondaryColorCode: '',
      styleNumber: '',
      releaseDate: '',
      imageSrc: '',
      active: ''
    })).toEqual(
      [
        {
          name: 'This field is required',
          brand: 'This field is required',
          category: 'This field is required',
          type: 'This field is required',
          material: 'This field is required',
          description: 'This field is required',
          demographic: 'This field is required',
          price: 'This field is required',
          quantity: 'This field is required',
          primaryColorCode: 'This field is required',
          secondaryColorCode: 'This field is required',
          styleNumber: 'This field is required',
          releaseDate: 'This field is required',
          imageSrc: 'This field is required',
          active: 'This field is required'
        }
      ]
    );
  });

  it('validates name format', () => {
    expect(validateProductCreation({ ...validProduct, name: 'Fire & Ice 2.0 Sneaker-Socks' })).toEqual([
      { active: 'This field is required' }
    ]);
    expect(validateProductCreation({ ...validProduct, name: 'Fire$*@' })).toEqual([{
      name: 'May contain letters, spaces, numbers, periods, dashes, apostrophes, and ampersands',
      active: 'This field is required'
    }]);
  });

  it('validates brand format', () => {
    expect(validateProductCreation({ ...validProduct, brand: 'Fire & Ice 2.0 Game-of-Throne' })).toEqual([
      { active: 'This field is required' }
    ]);
    expect(validateProductCreation({ ...validProduct, brand: 'Fire$*@' })).toEqual([{
      brand: 'May contain letters, spaces, numbers, periods, dashes, apostrophes, and ampersands',
      active: 'This field is required'
    }]);
  });

  it('validates category format', () => {
    expect(validateProductCreation({ ...validProduct, category: 'Fire Ice Sneaker-Socks' })).toEqual([
      { active: 'This field is required' }
    ]);
    expect(validateProductCreation({ ...validProduct, category: 'Fire&Ice 3.0' })).toEqual([{
      category: 'May only contain letters, dashes, and spaces.',
      active: 'This field is required'
    }]);
  });

  it('validates type format', () => {
    expect(validateProductCreation({ ...validProduct, type: 'Fire Ice Sneaker-Socks' })).toEqual([
      { active: 'This field is required' }
    ]);
    expect(validateProductCreation({ ...validProduct, type: 'Fire&Ice 3.0' })).toEqual([{
      type: 'May only contain letters, dashes, and spaces.',
      active: 'This field is required'
    }]);
  });

  it('validates material format', () => {
    expect(validateProductCreation({ ...validProduct, material: 'Fire Ice Sneaker-Socks' })).toEqual([
      { active: 'This field is required' }
    ]);
    expect(validateProductCreation({ ...validProduct, material: 'Fire&Ice 3.0' })).toEqual([{
      material: 'May only contain letters, dashes, and spaces.',
      active: 'This field is required'
    }]);
  });

  it('validates description format', () => {
    expect(validateProductCreation({ ...validProduct, description: 'Fire & Ice 2.0 Game-of-Throne' })).toEqual([
      { active: 'This field is required' }
    ]);
    expect(validateProductCreation({ ...validProduct, description: 'Fire$*@' })).toEqual([{
      description: 'May contain letters, spaces, numbers, periods, dashes, apostrophes, and ampersands',
      active: 'This field is required'
    }]);
  });

  it('validates demographic format', () => {
    expect(validateProductCreation({ ...validProduct, demographic: 'women' })).toEqual([
      { active: 'This field is required' }
    ]);
    expect(validateProductCreation({ ...validProduct, demographic: 'women4eva!' })).toEqual([{
      demographic: 'May only contain letters',
      active: 'This field is required'
    }]);
  });

  it('validates price format', () => {
    expect(validateProductCreation({ ...validProduct, price: '50.99' })).toEqual([
      { active: 'This field is required' }
    ]);
    expect(validateProductCreation({ ...validProduct, price: '56' })).toEqual([{
      price: 'Must be a number with two decimal places',
      active: 'This field is required'
    }]);
  });

  it('validates quantity format', () => {
    expect(validateProductCreation({ ...validProduct, quantity: '500' })).toEqual([
      { active: 'This field is required' }
    ]);
    expect(validateProductCreation({ ...validProduct, quantity: '50.75' })).toEqual([{
      quantity: 'Must be a whole number',
      active: 'This field is required'
    }]);
  });

  it('validates primaryColorCode format', () => {
    expect(validateProductCreation({ ...validProduct, primaryColorCode: '#123afd' })).toEqual([
      { active: 'This field is required' }
    ]);
    expect(validateProductCreation({ ...validProduct, primaryColorCode: 'sdf87dg' })).toEqual([{
      primaryColorCode: 'Input must be a valid hexcode ex. #ffffff',
      active: 'This field is required'
    }]);
  });

  it('validates secondaryColorCode format', () => {
    expect(validateProductCreation({ ...validProduct, secondaryColorCode: '#123afd' })).toEqual([
      { active: 'This field is required' }
    ]);
    expect(validateProductCreation({ ...validProduct, secondaryColorCode: 'sdfjfv787dg' })).toEqual([{
      secondaryColorCode: 'Input must be a valid hexcode ex. #ffffff',
      active: 'This field is required'
    }]);
  });

  it('validates imageSrc format', () => {
    expect(validateProductCreation({ ...validProduct, imageSrc: 'image.com' })).toEqual([
      { active: 'This field is required' }
    ]);
  });
});
