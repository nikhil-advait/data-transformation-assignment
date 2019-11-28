/**
 * This code is some improvement over with-loops.js as common functionality is taken out.
 */

const { funOps } = require('./utils');

// Take out common behavious which is shared by both dimensions and groupBy processing.
const mutateObjWithData = (obj, keys, el, cb) => {
    keys.forEach((key, index) => {
        obj[key] = obj[key] || {};
        const objVal = obj[key];
        const elVal = el[key];
        objVal[elVal] = objVal[elVal] || {};

        if (index === keys.length - 1) {
            if (cb) {
                return cb(objVal[elVal]);
            } else {
                return obj;
            }
        } else {
            obj = objVal[elVal];
        }
    });
};


// This function transforms the data to give expected output as explained above.
const massageData = (data, dimensions, groupBy, measures) => {
    const result = {};
    result.output = {};

    // container reference to hold last dimension object.
    let container = result.output;

    data.forEach(el => {

        // Pass callback for groupBy processing and utilize same mutateObjWithData function again.
        mutateObjWithData(container, dimensions, el, (dimensionsObj) => {

            // Pass callback for measures processing
            return mutateObjWithData(dimensionsObj, groupBy, el, (groupObj) => {
                // m is the measure
                measures.forEach(m => {
                    const previousMeasureVal = groupObj[m.name] || 0;
                    groupObj[m.name] = funOps[m.fun](previousMeasureVal, el[m.name]);
                })

                return groupObj;
            })
        })
    });

    return result.output;
};

module.exports = massageData;