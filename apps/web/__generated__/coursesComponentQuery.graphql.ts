/**
 * @generated SignedSource<<9f9e9fe8bec3c3023a3bfac38f50d138>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
export type coursesComponentQuery$variables = Record<PropertyKey, never>;
export type coursesComponentQuery$data = {
  readonly courses:
    | ReadonlyArray<
        | {
            readonly id: string;
            readonly slug: string;
            readonly title: string;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};
export type coursesComponentQuery = {
  response: coursesComponentQuery$data;
  variables: coursesComponentQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
    {
      alias: null,
      args: null,
      concreteType: "Course",
      kind: "LinkedField",
      name: "courses",
      plural: true,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "id",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "title",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "slug",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ];
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "coursesComponentQuery",
      selections: v0 /*: any*/,
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "coursesComponentQuery",
      selections: v0 /*: any*/,
    },
    params: {
      cacheID: "a5df4d39a104b13ca09ea9c1b0f7f1d3",
      id: null,
      metadata: {},
      name: "coursesComponentQuery",
      operationKind: "query",
      text: "query coursesComponentQuery {\n  courses {\n    id\n    title\n    slug\n  }\n}\n",
    },
  };
})();

(node as any).hash = "d2362e8cc28093abce76653f662c493c";

export default node;
