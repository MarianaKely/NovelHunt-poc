
import { MainRules , Construction } from "protocols/novelHuntConfigProtocols";


export function ConstctBody (putConfig: Construction[]): MainRules {

    const mainArray = [];
    let index = 0;
    let BlankS = "";

    for (const mainConstct of putConfig) {

      index++;
      BlankS += index === 1 ? "WHERE " : " AND ";

      if (mainConstct.sequence) {

        BlankS += mainConstct.sequence.replace("__VAR__", `$${index}`);

      } else {

        BlankS += mainConstct.retrograde
          ? `( $${index}  ${mainConstct.pts} ${mainConstct.backing} )`
          : `( ${mainConstct.backing} ${mainConstct.pts} $${index} )`;
      }

      mainArray.push(mainConstct.shifter);

    }return {

      rules: BlankS,
      mainArray: mainArray.length === 0 ? undefined : mainArray,

    };

  }