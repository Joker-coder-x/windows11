export function makeNamespace (prefixNasp) {
  return function _namespace(name) {
    return `${prefixNasp}/${name}`;
  };
}

export const viewNamespaceSymbol = "view";
export const taskNamespaceSymbol = "task";
export const layoutNamespaceSymbol = "layout";
export const systemNamespaceSymbol = "system";

export const viewNamespace = makeNamespace(viewNamespaceSymbol);
export const taskNamespace = makeNamespace(taskNamespaceSymbol);
export const layoutNamespace = makeNamespace(layoutNamespaceSymbol);
export const systemNamespace = makeNamespace(systemNamespaceSymbol);