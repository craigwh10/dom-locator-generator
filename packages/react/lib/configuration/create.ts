import prompts from 'prompts';
import {generateBaseConfig, promptValidations} from "shared/lib/configuration";

(async () => {
   const responses = await prompts(
       [
          {
             type: 'text',
             name: 'searchRoot',
             message: 'Where should this search for attributes from? (default is cwd)',
             validate: value => promptValidations.isDir(value),
          },
          {
             type: 'list',
             name: 'attributes',
             separator: ',',
             message: 'Which element attributes (data-testid, placeholder, ...)?',
          },
          {
             type: 'text',
             name: 'locationForFile',
             message: 'Where should this be saved?'
          }
       ]
   );


   if (responses) {
      generateBaseConfig({
         searchRoot: responses.searchRoot,
         attributes: responses.attributes,
         locationForFile: responses.locationForFile
      })
   }
})()