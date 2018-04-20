var FEATURES = [
  {
    'title': 'Toilet',
    'presence': true,
    'subfeatures': [
        {
            'title': 'Urinal',
            'presence': false,
            'subfeatures': []
        },
        {
            'title': 'Stall',
            'presence': true,
            'subfeatures': []
        }
    ]
  },
  {
    'title': 'Pets allowed',
    'presence': true,
    'subfeatures': []
  },
  {
    'title': 'Shower',
    'presence': false,
    'subfeatures': [
      {
        'title': 'Outdoor shower',
        'presence': false,
        'subfeatures': []
      }
    ]
  },
  {
    'title': 'Trash',
    'presence': true,
    'subfeatures': [
      {
        'title': 'Recycling bin',
        'presence': true,
        'subfeatures': []
      },
      {
        'title': 'Compost bin',
        'presence': true,
        'subfeatures': [
            {
                'title': 'Meat Allowed',
                'presence': false,
                'subfeatures': [
                    {
                        'title': 'Beef',
                        'presence': false,
                        'subfeatures': []
                    },
                    {
                        'title': 'Chicken',
                        'presence': false,
                        'subfeatures': []
                    },
                    {
                        'title': 'Pork',
                        'presence': false,
                        'subfeatures': []
                    }
                ]
            }
        ]
      },
      {
        'title': 'Trash bin',
        'presence': false,
        'subfeatures': [
          {
            'title': 'Pack in, pack out',
            'presence': true,
            'subfeatures': [
                {
                  'title': 'Bears',
                  'presence': true,
                  'subfeatures': []
                }
            ]
          }
        ]
      }
    ]
  }
];

module.exports = FEATURES;
