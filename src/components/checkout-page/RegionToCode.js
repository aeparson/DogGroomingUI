/**
 * Converts a region's full name into its two-letter abbreviation
 * (lightly changed from https://gist.github.com/calebgrove/c285a9510948b633aa47?permalink_comment_id=3653829#gistcomment-3653829)
 * @param {string} region Full name of region
 * @returns Two-letter code for region, or null if region is undefined or not listed
 */
function regionToCode(region) {
  const regions = {
    arizona: 'AZ',
    alabama: 'AL',
    alaska: 'AK',
    arkansas: 'AR',
    'american samoa': 'AS',
    california: 'CA',
    colorado: 'CO',
    connecticut: 'CT',
    'district of columbia': 'DC',
    delaware: 'DE',
    'federated states of micronesia': 'FM',
    florida: 'FL',
    georgia: 'GA',
    guam: 'GU',
    hawaii: 'HI',
    idaho: 'ID',
    illinois: 'IL',
    indiana: 'IN',
    iowa: 'IA',
    kansas: 'KS',
    kentucky: 'KY',
    louisiana: 'LA',
    maine: 'ME',
    'marshall islands': 'MH',
    maryland: 'MD',
    massachusetts: 'MA',
    michigan: 'MI',
    minnesota: 'MN',
    mississippi: 'MS',
    missouri: 'MO',
    montana: 'MT',
    nebraska: 'NE',
    nevada: 'NV',
    'new hampshire': 'NH',
    'new jersey': 'NJ',
    'new mexico': 'NM',
    'new york': 'NY',
    'north carolina': 'NC',
    'north dakota': 'ND',
    'northern mariana islands': 'MP',
    ohio: 'OH',
    oklahoma: 'OK',
    oregon: 'OR',
    pennsylvania: 'PA',
    'rhode island': 'RI',
    'south carolina': 'SC',
    'south dakota': 'SD',
    tennessee: 'TN',
    texas: 'TX',
    utah: 'UT',
    vermont: 'VT',
    virginia: 'VA',
    washington: 'WA',
    'west virginia': 'WV',
    wisconsin: 'WI',
    wyoming: 'WY',
    'puerto rico': 'PR',
    'us virgin islands': 'VI',
    'us minor outlying islands': 'UM'
  };

  if (region === undefined) {
    return null;
  }
  const name = region.trim().replace(/[^\w ]/g, '').toLowerCase();
  if (regions[name] !== null) {
    return regions[name];
  }

  return null;
}

export default regionToCode;
