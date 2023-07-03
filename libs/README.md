* Generate next lib
  - npx nx g @@nrwl/next:library data-access --style styled-components
  - npx nx g @nrwl/next:library feature-sets --style styled-components
* Generate next component
  - npx nx generate @nrwl/next:component --name=SetTagList --export --project=feature-sets --style=styled-components