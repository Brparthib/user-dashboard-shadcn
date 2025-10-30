"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: NavMainProps["items"];
  }[];
}

export function NavMain({ items }: NavMainProps) {
  const location = useLocation();

  const isItemActive = (item: NavMainProps["items"][0]): boolean => {
    if (location.pathname === item.url) return true;
    
    // Check if any child item is active
    if (item.items) {
      return item.items.some(child => isItemActive(child));
    }
    
    return false;
  };

  const renderNavItems = (navItems: NavMainProps["items"], level = 0) => {
    return navItems.map((item) => {
      const hasChildren = item.items && item.items.length > 0;
      const isActive = isItemActive(item);
      const Icon = item.icon;

      if (hasChildren) {
        return (
          <Collapsible key={item.title} asChild defaultOpen={isActive}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {Icon && <Icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 collapsible:transform collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {renderNavItems(item.items!, level + 1)}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        );
      }

      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={isActive}>
            <Link to={item.url}>
              {Icon && <Icon />}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>{renderNavItems(items)}</SidebarMenu>
    </SidebarGroup>
  );
}