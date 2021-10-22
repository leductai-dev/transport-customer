// import React from "react";
// import { getAlgoliaResults } from "@algolia/autocomplete-js";
// import algoliasearch from "algoliasearch";
// import { AlgoliaAutocomplete } from "./AlogliaAutocomplete";
// import { ProductItem } from "./ProductItem";
// // import "@algolia/autocomplete-theme-classic";

// const searchClient = algoliasearch(
//   "OLJUUV3GGY",
//   "4f8bb50a45f0508700ee7e28cd6a8a1a"
// );

// const AlgoliaSearch = () => {
//   return (
//     <div className="app-container">
//       <AlgoliaAutocomplete
//         openOnFocus={true}
//         // defaultActiveItemId={0}
//         getSources={({ query }) => [
//           {
//             sourceId: "courses",
//             getItems() {
//               return getAlgoliaResults({
//                 searchClient,
//                 queries: [
//                   {
//                     indexName: "meritbodhi_courses",
//                     query,
//                     params: {
//                       hitsPerPage: 7,
//                       facetFilters: "status:Verified"
//                     }
//                   }
//                 ]
//               });
//             },
//             templates: {
//               item({ item, components }) {
//                 return <ProductItem hit={item} components={components} />;
//               }
//             }
//           }
//         ]}
//       />
//     </div>
//   );
// };

// export default AlgoliaSearch;
