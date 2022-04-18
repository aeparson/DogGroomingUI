import handleChange from './FilterMenu';

describe('handleChange', () => {
  it('creates custom database call', () => {
    const filterTestData = [
      {
        id: 1,
        title: 'A',
        filterAddy: 'AFilter'
      },
      {
        id: 2,
        title: 'B',
        filterAddy: 'BFilter'
      },
      {
        id: 3,
        title: 'C',
        filterAddy: 'CFilter'
      }
    ];
    const expected = 'AFilterBFilterCFilter';

    expect(handleChange(filterTestData)).toEqual(expected);
  });
});
