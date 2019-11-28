/**
 * This solution is straighforward with loops.
 */
const { funOps } = require('./utils');

// This function transforms the data to give expected output as explained above.
const massageData = (data, dimensions, groupBy, measures) => {
    const result = {};
    result.output = {};

    // container reference to hold last dimension object.
    let container = result.output;

    data.forEach(el => {
        // d is dimension and i is index of the dimension
        dimensions.forEach((d, i) => {
            // Assigne empty object if value is not assigned already.
            container[d] = container[d] || {};

            const dimensionObj = container[d];
            const dimensionValueInEl = el[d];

            dimensionObj[dimensionValueInEl] = dimensionObj[dimensionValueInEl] || {};

            // If last dimension
            if (i === dimensions.length - 1) {
                // Hold last group object reference in lastG.
                let lastG = dimensionObj[dimensionValueInEl];

                // g is group and j is index of the group
                groupBy.forEach((g, j) => {

                    lastG[g] = lastG[g] || {};
                    const groupObj = lastG[g];
                    const groupValueInEl = el[g];

                    groupObj[groupValueInEl] = groupObj[groupValueInEl] || {};

                    // If last group
                    if (j === groupBy.length - 1) {

                        // m is the measure
                        measures.forEach(m => {
                            const previousMeasureVal = groupObj[groupValueInEl][m.name] || 0;
                            groupObj[groupValueInEl][m.name] = funOps[m.fun](previousMeasureVal, el[m.name]);
                        })

                    } else {
                        // If not last groupt then assigne last group obj to reference for future iterations.
                        lastG = dimensionObj[dimensionValueInEl][g][groupValueInEl];
                    }

                });

                container = result.output;

            } else {
                // If not last dimension then assign last dimesion object to container for future iterations
                container = dimensionObj[dimensionValueInEl];
            }

        });

    });

    return result.output;
};

module.exports = massageData;