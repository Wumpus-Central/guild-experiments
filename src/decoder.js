import { parsePopulation } from "./parsers/parsePopulation.js" 



function decodeExperiment(experiment){

    let decodedExperiment = {}

    const overrides = {}
    // find overrides:
    experiment[4].forEach(override=>{
        overrides[override.b] = override.k
    })

    decodedExperiment.hash = experiment[0]
    decodedExperiment.revision = experiment[2]
    decodedExperiment.id = experiment[1] ?? null
    decodedExperiment.populations = experiment[3].map(parsePopulation)
    // discord fucking has too many arrays on these that's why we flat them before running the loop:
    decodedExperiment.overridesFormatted = (experiment?.[5]?.flat() || []).map(parsePopulation)    

    decodedExperiment.overrides = overrides

    decodedExperiment.aaMode = experiment.pop() === 0 ? false : true // if aa mode is 0 it's false, if 1 it's true
    
    
    return decodedExperiment
}

export { decodeExperiment }
