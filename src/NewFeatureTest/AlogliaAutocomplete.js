import { autocomplete } from "@algolia/autocomplete-js";
import React, { createElement, Fragment, useEffect, useRef } from "react";
import { render } from "react-dom";

export function AlgoliaAutocomplete(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      // source: autocomplete.sources.hits("meritbodhi_courses", {
      //   hitsPerPage: 5
      // }),
      renderer: { createElement, Fragment },
      render({ children }, root) {
        render(children, root);
      },
      ...props
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}
