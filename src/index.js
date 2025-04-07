import fs from "fs/promises";
import { decodeExperiment } from "./decoder.js";
import v3 from "./v3.js";
async function main() {
  const experimentsDefinitions = await (
    await fetch(
      "https://gist.githubusercontent.com/DiscrapperManager/05962f6137eacd9dbbc589d97c8ece3f/raw/experiments.json"
    )
  ).json();

  const experiments = await (
    await fetch(
      "https://canary.discord.com/api/v10/experiments?with_guild_experiments=true"
    )
  ).json();
  const result = [];
  for (let experiment of experiments.guild_experiments) {
    const experimentDecoded = decodeExperiment(experiment);
    experimentDecoded.definition =
      experimentsDefinitions.find(
        (exp) => Number(v3(exp.id)) === experimentDecoded.hash
      ) || {};
    result.push(experimentDecoded);
  }
  await fs.writeFile(
    "./data/guild_experiments.json",
    JSON.stringify(result, null, 4),
    "utf-8"
  );
}

main();
