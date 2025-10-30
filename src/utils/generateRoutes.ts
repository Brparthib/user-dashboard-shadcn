import type { TSidebarItem } from "@/types";

const flattenRoutes = (items: TSidebarItem[]): { path: string; Component?: React.ComponentType }[] => {
  return items.flatMap((item) => {
    const routes = [];
    
    // Only add route if it has a component (leaf node)
    if (item.component) {
      routes.push({
        path: item.url,
        Component: item.component,
      });
    }
    
    // Recursively process child items
    if (item.items) {
      routes.push(...flattenRoutes(item.items));
    }
    
    return routes;
  });
};

export const generateRoutes = (sidebarItems: TSidebarItem[]) => {
  return flattenRoutes(sidebarItems);
};  