import filterTypes from "../filters/filtersTypes.js";
import { DataTypes0, DataTypes1 } from "../filters/filterDataTypes.js";

function parsePopulations(encoded_populations) {
  const buckets = {};
  const filters = [];

  const populations = [];

  encoded_populations.forEach((population) => {
    // find buckets
    population[0].forEach((bucket) => {
      buckets[bucket[0].toString()] = {
        rollout: [],
      };

      bucket[1].forEach((rollout) => {
        buckets[bucket[0].toString()].rollout.push({
          start: rollout.s,
          end: rollout.e,
        });
      });
    });

    // find filters:
    population[1].forEach((filter) => {
      if (Object.keys(filterTypes).includes(filter[0].toString())) {
        for (let data of filter[1]) {
          if (filterTypes[filter[0]]?.requiredData?.includes(data[0])) {
            let filter_ = {};

            filter_.type = filterTypes[filter[0]].type;
            filter_[DataTypes0[data[0]]] = data[1];
            filters.push(filter_);
          } else {
            console.log(
              `[ERROR] Excepted key to be in required data list but got ${
                DataTypes0[data[0]]
              }`,
              filter
            );
          }
        }
      } else {
        filters.push({
          type: filterTypes.default.type,
        });
      }
    });
   // merge filters with same type
   let mergedFilters = []
   const repeatedTypes = {}
   for (let filter of filters) {
     if (!repeatedTypes[filter.type]) repeatedTypes[filter.type] = []
     repeatedTypes[filter.type].push(filter) 
   }
   for (let repeatedType in repeatedTypes) {
     const data = {}
     for (let filter of repeatedTypes[repeatedType]) {
      for (let key in filter) {
       if (key === "type") continue
       data[key] = filter[key]  
      }
     }
     mergedFilters.push({type:repeatedType, ...data}}  
   }
    
    populations.push({
      buckets: buckets,
      filters: filters,
    });
  });

  return populations;
}

export { parsePopulations };
