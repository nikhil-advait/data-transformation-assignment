# Problem statement
This assignment was given to my by a Silicon valley (San Jose) based startup which deals with lot of data transformation.

Write a function which should output data for pivot table if inputs to that function are: 
1. Array of  objects
2. Dimensions
3. groupBy fields 
4. Measures (Summarization columns and functions)
```
Example:
 input1 - array of objects = [
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
input2 - dimensions= ['category']
input3 - groupBy = ['month']
input4 - measures = [{name: 'revenue', fun: 'sum'},{name: 'tax', fun: 'sum'}]

Output (Tabular format):
               Jan              Feb            March
          Revenue Tax      Revenue Tax     Revenue Tax
 Laptop . 40000   100      10000   400     20000   200
 Ipad     30000   200      8000    50      30000   350
 
 Output (JSON format):
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
 ```
 
 # Solution:
 See index.js. It imports two solutions:
 1. with-loops.js
 2. with-refractoring.js
 
