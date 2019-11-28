// Aggregation operations
const funOps = {
    sum: (previous, current) => {
        return previous + current
    },
    avg: () => { /* Some implementation */},
    count: () => { /* Some implementation */ }
};

exports.funOps = funOps;