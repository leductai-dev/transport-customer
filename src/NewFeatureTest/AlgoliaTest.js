import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "OLJUUV3GGY",
  "4f8bb50a45f0508700ee7e28cd6a8a1a"
);

const AlgoliaTest = () => (
  <InstantSearch searchClient={searchClient} indexName="meritbodhi_courses">
    <SearchBox />
    <Hits />
  </InstantSearch>
);

export default AlgoliaTest;
