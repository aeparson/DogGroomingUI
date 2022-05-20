const priceFilters = [
  {
    id: 1,
    title: 'MIN',
    cName: 'navText',
    filterAddy: 'minPrice=',
    value: ''
  },
  {
    id: 2,
    title: 'MAX',
    cName: 'navText',
    filterAddy: 'maxPrice=',
    value: ''
  }
];
const demographicFilters = [
  {
    id: 1,
    title: 'MEN',
    cName: 'navText',
    filterAddy: 'demographic=men&',
    value: false
  },
  {
    id: 2,
    title: 'WOMEN',
    cName: 'navText',
    filterAddy: 'demographic=women&',
    value: false
  },
  {
    id: 3,
    title: 'KIDS',
    cName: 'navText',
    filterAddy: 'demographic=kids&',
    value: false
  }
];

const colorFilters = [
  {
    id: 1,
    title: 'AQUA',
    cName: 'navText',
    filterAddy: 'color=%2353bbb4&',
    value: false
  },
  {
    id: 2,
    title: 'BLACK',
    cName: 'navText',
    filterAddy: 'color=%23000000&',
    value: false
  },
  {
    id: 3,
    title: 'DARK BLUE',
    cName: 'navText',
    filterAddy: 'color=%233079ab&',
    value: false
  },
  {
    id: 4,
    title: 'DARK GRAY',
    cName: 'navText',
    filterAddy: 'color=%23637a91&',
    value: false
  },
  {
    id: 5,
    title: 'GREEN',
    cName: 'navText',
    filterAddy: 'color=%2351b46d&',
    value: false
  },
  {
    id: 6,
    title: 'LAVENDER',
    cName: 'navText',
    filterAddy: 'color=%23838cc7&',
    value: false
  },
  {
    id: 7,
    title: 'LIGHT BLUE',
    cName: 'navText',
    filterAddy: 'color=%2339add1&',
    value: false
  },
  {
    id: 8,
    title: 'LIGHT GRAY',
    cName: 'navText',
    filterAddy: 'color=%23b7c0c7&',
    value: false
  },
  {
    id: 9,
    title: 'MAUVE',
    cName: 'navText',
    filterAddy: 'color=%23c25975&',
    value: false
  },
  {
    id: 10,
    title: 'MUSTARD',
    cName: 'navText',
    filterAddy: 'color=%23e0ab18&',
    value: false
  },
  {
    id: 11,
    title: 'ORANGE',
    cName: 'navText',
    filterAddy: 'color=%23f9845b&',
    value: false
  },
  {
    id: 12,
    title: 'PINK',
    cName: 'navText',
    filterAddy: 'color=%23f092b0&',
    value: false
  },
  {
    id: 13,
    title: 'PURPLE',
    cName: 'navText',
    filterAddy: 'color=%237d669e&',
    value: false
  },
  {
    id: 14,
    title: 'RED',
    cName: 'navText',
    filterAddy: 'color=%23e15258&',
    value: false
  },
  {
    id: 15,
    title: 'WHITE',
    cName: 'navText',
    filterAddy: 'color=%23ffffff&',
    value: false
  }
];

const brandFilters = [
  {
    id: 1,
    title: 'ADIDAS',
    cName: 'navText',
    filterAddy: 'brand=adidas&',
    value: false
  },
  {
    id: 2,
    title: 'ASICS',
    cName: 'navText',
    filterAddy: 'brand=asics&',
    value: false
  },
  {
    id: 3,
    title: 'BROOKS',
    cName: 'navText',
    filterAddy: 'brand=brooks&',
    value: false
  },
  {
    id: 4,
    title: 'CHAMPION',
    cName: 'navText',
    filterAddy: 'brand=champion&',
    value: false
  },
  {
    id: 5,
    title: 'COLUMBIA',
    cName: 'navText',
    filterAddy: 'brand=columbia&',
    value: false
  },
  {
    id: 6,
    title: 'LULULEMON',
    cName: 'navText',
    filterAddy: 'brand=lululemon&',
    value: false
  },
  {
    id: 7,
    title: 'NEW BALANCE',
    cName: 'navText',
    filterAddy: 'brand=new balance&',
    value: false
  },
  {
    id: 8,
    title: 'NIKE',
    cName: 'navText',
    filterAddy: 'brand=nike&',
    value: false
  },
  {
    id: 9,
    title: 'PUMA',
    cName: 'navText',
    filterAddy: 'brand=puma&',
    value: false
  },
  {
    id: 10,
    title: 'REEBOK',
    cName: 'navText',
    filterAddy: 'brand=reebok&',
    value: false
  },
  {
    id: 11,
    title: 'UNDER ARMOUR',
    cName: 'navText',
    filterAddy: 'brand=under armour&',
    value: false
  }

];

const categoryFilters = [
  {
    id: 1,
    title: 'BASEBALL',
    cName: 'navText',
    filterAddy: 'category=baseball&',
    value: false
  },
  {
    id: 2,
    title: 'BASKETBALL',
    cName: 'navText',
    filterAddy: 'category=basketball&',
    value: false
  },
  {
    id: 3,
    title: 'BOXING',
    cName: 'navText',
    filterAddy: 'category=boxing&',
    value: false
  },
  {
    id: 4,
    title: 'FOOTBALL',
    cName: 'navText',
    filterAddy: 'category=football&',
    value: false
  },
  {
    id: 5,
    title: 'GOLF',
    cName: 'navText',
    filterAddy: 'category=golf&',
    value: false
  },
  {
    id: 6,
    title: 'HOCKEY',
    cName: 'navText',
    filterAddy: 'category=hockey&',
    value: false
  },
  {
    id: 7,
    title: 'RUNNING',
    cName: 'navText',
    filterAddy: 'category=running&',
    value: false
  },
  {
    id: 8,
    title: 'SKATEBOARDING',
    cName: 'navText',
    filterAddy: 'category=skateboarding&',
    value: false
  },
  {
    id: 9,
    title: 'SOCCER',
    cName: 'navText',
    filterAddy: 'category=soccer&',
    value: false
  },
  {
    id: 10,
    title: 'WEIGHTLIFTING',
    cName: 'navText',
    filterAddy: 'category=weightlifting&',
    value: false
  }
];

const materialFilters = [
  {
    id: 1,
    title: 'BAMBOO FIBER',
    cName: 'navText',
    filterAddy: 'material=bamboo fiber&',
    value: false
  },
  {
    id: 2,
    title: 'COTTON',
    cName: 'navText',
    filterAddy: 'material=cotton&',
    value: false
  },
  {
    id: 3,
    title: 'GORE-TEX',
    cName: 'navText',
    filterAddy: 'material=gore-tex&',
    value: false
  },
  {
    id: 4,
    title: 'MICROFIBER',
    cName: 'navText',
    filterAddy: 'material=microfiber&',
    value: false
  },
  {
    id: 5,
    title: 'NEOPRENE',
    cName: 'navText',
    filterAddy: 'material=neoprene&',
    value: false
  },
  {
    id: 6,
    title: 'NYLON',
    cName: 'navText',
    filterAddy: 'material=nylon&',
    value: false
  },
  {
    id: 7,
    title: 'POLYESTER',
    cName: 'navText',
    filterAddy: 'material=polyester&',
    value: false
  },
  {
    id: 8,
    title: 'POLYPROPYLENE',
    cName: 'navText',
    filterAddy: 'material=polypropylene&',
    value: false
  },
  {
    id: 9,
    title: 'SPANDEX',
    cName: 'navText',
    filterAddy: 'material=spandex&',
    value: false
  },
  {
    id: 10,
    title: 'TENCEL',
    cName: 'navText',
    filterAddy: 'material=tencel&',
    value: false
  },
  {
    id: 11,
    title: 'WOOL',
    cName: 'navText',
    filterAddy: 'material=wool&',
    value: false
  }
];

export {
  demographicFilters, brandFilters,
  categoryFilters, materialFilters, colorFilters,
  priceFilters
};
