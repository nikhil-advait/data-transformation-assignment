/*
************************************************ Following is given problem statement *****************************************************

// input -  array of json objects
// input - pivot columns
// input - summarization columns and functions
// output - a pivot table

/*example:
 arr = [

 {category: 'Laptop',
  rating: 4,
  revenue: '10000',
  tax: '200'
  month: 'Jan',
  year: '2019'
 },

  {category: 'Laptop',
  rating: 5,
  revenue: '20000',
  tax: '300'
  month: 'Jan',
  year: '2019'
 },

  {category: 'Ipad',
  rating: 2,
  revenue: '30000',
  tax: '400'
  month: 'Feb',
  year: '2019'
 },

 ......

 ]

dimension= ['category']
groupBy = ['month']
measures = [{name: 'revenue', fun: 'sum'},{name: 'tax', fun: 'sum'}]

          Jan .  Feb   March
 Laptop . 40000 .10000  40000
 Ipad     30000 . 8000 23000

 output: [
 {
  category: 'Laptop',
  Jan: {revenue: 40000, tax: 4000},
  Feb: {revenue: 10000, tax: 2000},
  Mar: {revenue40000
 }, ....

 ]


 ***************************************************** My understanding  ******************************************************************

 Actually output for above problem statement should be like:

               Jan              Feb            March
          Revenue Tax      Revenue Tax     Revenue Tax
 Laptop . 40000   100      10000   400     20000   200
 Ipad     30000   200      8000    50      30000   350

  {
     category: {
        laptop: {
            month: {
                jan: {
                    revenue: 40000,
                    tax: 100
                },
                feb: {
                    :
                }
            }
        },
        ipad: {
            month: {
                jan: {
                    revenue: 30000
                    tax: 350
                },
                feb: {

                }
            }
        }
     }
 }



 If more than one dimension/groupBy given
 e.g.

  dimension= ['category', 'rating']
  groupBy = ['year', 'month']
  measures = [{name: 'revenue', fun: 'sum'},{name: 'tax', fun: 'sum'}]

  Then output should be like:

                 Jan19               Feb19       ....          Jan20
            Revenue  Tax        Revenue  Tax              Revenue  Tax
 Laptop-1   40000    500        10000    100     ....    40000     500
 Laptop-2   40000    400        10000    200     ....    30000     600
 Laptop-3   40000    300        10000    300     ....    20000     600
  :
  :
  :
 Ipad-1     30000    200        4000    500      ....    13000     700
 Ipad-2     20000    300        5000    400      ....    33000     600
 Ipad-3     60000    100        6000    300      ....    12300     450

 Output JSON:

    {
        category : {
            laptop: {
                rating: {
                    1: {
                        year: {
                            2019: {
                                month: {
                                    jan: {
                                        revenue: 40000,
                                        tax: 300
                                    },
                                    feb: {
                                        revenue: 50000,
                                        tax: 400
                                    }
                                }
                            }
                        }
                    },
                    2: {

                    }
                }
            },
            ipad: {

            }
        }
    }
}

 */


// Aggregation operations
const funOps = {
    sum: (previous, current) => {
        return previous + current
    },
    avg: () => { },
    count: () => { }
}



// This function transforms the data to give expected output as explained above.
const massageData = (data, dimensions, groupBy, measures) => {
    const result = {};
    result.output = {}

    // container reference to hold last dimension object.
    let container = result.output;

    data.forEach(el => {
        // d is dimension and i is index of the dimension
        dimensions.forEach((d, i) => {
            // Assigne empty object if value is not assigned already.
            container[d] = container[d] || {};

            const dimensionObj  = container[d]
            const dimensionValueInEl = el[d];

            dimensionObj[dimensionValueInEl] = dimensionObj[dimensionValueInEl] || {}

            // If last dimension
            if (i === dimensions.length - 1) {
                // Hold last group object reference in lastG.
                let lastG = dimensionObj[dimensionValueInEl];

                // g is group and j is index of the group
                groupBy.forEach((g, j) => {

                    lastG[g] = lastG[g] || {};
                    const groupObj = lastG[g]
                    const groupValueInEl = el[g]

                    groupObj[groupValueInEl] = groupObj[groupValueInEl] || {};

                    // If last group
                    if (j === groupBy.length - 1) {

                        // m is the measure
                        measures.forEach(m => {
                            const previousMeasureVal = groupObj[groupValueInEl][m.name] || 0;
                            groupObj[groupValueInEl][m.name] = funOps[m.fun](previousMeasureVal, el[m.name])
                        })

                    } else {
                        // If not last groupt then assigne last group obj to reference for future iterations.
                        lastG = dimensionObj[dimensionValueInEl][g][groupValueInEl]
                    }

                });

                container = result.output

            } else {
                // If not last dimension then assign last dimesion object to container for future iterations
                container = dimensionObj[dimensionValueInEl]
            }

        });

    });

    return result.output;
};


const data = [
    { category: 'laptop', rating: 1, revenue: 10000, tax: 100, month: 'jan', year: 2019, day: 2 },
    { category: 'laptop', rating: 1, revenue: 20000, tax: 200, month: 'jan', year: 2019, day: 19 },
    { category: 'laptop', rating: 1, revenue: 30000, tax: 300, month: 'jan', year: 2019, day: 9 },
    { category: 'laptop', rating: 1, revenue: 10000, tax: 100, month: 'feb', year: 2019 },
    { category: 'laptop', rating: 1, revenue: 10000, tax: 100, month: 'jan', year: 2020 },
    { category: 'ipad', rating: 2, revenue: 20000, tax: 200, month: 'feb', year: 2019 },
    { category: 'camera', rating: 3, revenue: 30000, tax: 300, month: 'mar', year: 2019 },
    { category: 'laptop', rating: 4, revenue: 40000, tax: 400, month: 'apr', year: 2020 },
    { category: 'laptop', rating: 5, revenue: 50000, tax: 500, month: 'jan', year: 2019 },
    { category: 'ipad', rating: 1, revenue: 60000, tax: 600, month: 'jan', year: 2020 },
    { category: 'laptop', rating: 2, revenue: 70000, tax: 700, month: 'feb', year: 2019 },
    { category: 'laptop', rating: 3, revenue: 80000, tax: 800, month: 'mar', year: 2020 },
    { category: 'camera', rating: 4, revenue: 90000, tax: 900, month: 'mar', year: 2019 },
    { category: 'laptop', rating: 5, revenue: 10000, tax: 100, month: 'mar', year: 2020 },
    { category: 'ipad', rating: 2, revenue: 30000, tax: 300, month: 'feb', year: 2020 },
    { category: 'ipad', rating: 3, revenue: 40000, tax: 400, month: 'jan', year: 2019 },
    { category: 'laptop', rating: 4, revenue: 50000, tax: 500, month: 'jan', year: 2019 }
];

// Call messageData function with inputs as - data, dimensions, groupBy, measures
const output = massageData(
    data,
    ['category', 'rating'],
    ['year', 'month'],
    [{name: 'revenue', fun: 'sum'},{name: 'tax', fun: 'sum'}]
);

// This massaged data can be further pivoted/trasnformed as per display needs(if other format is required for display)
console.log(JSON.stringify(output, null, 2))