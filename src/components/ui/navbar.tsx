// "use client";

// import { motion, type MotionValue, useMotionValueEvent, useScroll } from "framer-motion";
// import Image from "next/image";
// // import { useTranslations } from "next-intl";
// import React, { useCallback, useMemo, useRef, useState } from "react";

// import { Button } from "@/components/ui/button";
// import { DialogTitle } from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
// // import { Link, usePathname } from "@/i18n/i18n.navigation";
// import { ArrowRight } from "@/lib/icons/ArrowRight";
// import { FilterSearch } from "@/lib/icons/FilterSearch";
// import { MenuLeft } from "@/lib/icons/MenuLeft";
// import { Search } from "@/lib/icons/Search";
// import { Sort } from "@/lib/icons/Sort";
// import { cn } from "@/lib/utils";
// import type { Icon } from "@/types/icon.types";

// // Comprehensive type definitions
// interface NavItem {
//   title: string;
//   url: string;
//   icon?: Icon;
//   items?: Array<{
//     title: string;
//     url: string;
//   }>;
// }

// interface NavbarProps {
//   children: React.ReactNode;
//   className?: string;
// }

// interface NavBodyProps {
//   children: React.ReactNode;
//   className?: string;
// }

// interface NavItemsProps {
//   items: NavItem[];
//   className?: string;
// }

// interface SearchTab {
//   readonly label: string;
//   readonly value: string;
// }

// interface SearchTranslations {
//   filter: string;
//   searchPlaceholder: string;
//   tabSelect: string;
//   sortBy: string;
// }

// interface SearchBarProps {
//   className?: string;
//   readonly options: readonly string[];
//   readonly tabs: readonly SearchTab[];
//   translations?: SearchTranslations;
// }

// interface NavItemComponentProps {
//   item: NavItem;
//   index: number;
//   isHovered: boolean;
//   onHover: () => void;
//   onLeave: () => void;
// }

// interface MobileNavItemProps {
//   item: NavItem;
//   onItemClick: () => void;
// }

// interface MobileNavFooterProps {
//   onClose: () => void;
// }

// interface NavbarLogoProps {
//   size?: number;
//   className?: string;
//   isFooter?: boolean;
// }

// interface FilterButtonProps {
//   filterText: string;
// }

// interface SearchInputProps {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder: string;
// }

// interface SearchTabsProps {
//   readonly tabs: readonly SearchTab[];
//   currentTab: string;
//   onTabChange: (tab: string) => void;
//   translations: Pick<SearchTranslations, "tabSelect">;
// }

// interface SortDropdownProps {
//   readonly options: readonly string[];
//   value: string;
//   onChange: (value: string) => void;
//   sortByText: string;
// }

// interface NavbarAnimations {
//   backdrop: {
//     blur: string;
//     shadow: string;
//   };
//   spring: {
//     stiffness: number;
//     damping: number;
//   };
//   navDot: {
//     stiffness: number;
//     damping: number;
//   };
// }

// const NAVBAR_ANIMATIONS: NavbarAnimations = {
//   backdrop: {
//     blur: "blur(8px)",
//     shadow:
//       "0 0 2px 0 oklch(0.69 0.0242 248.18 / 20%), 0 12px 24px -4px oklch(0.69 0.0242 248.18 / 12%)",
//   },
//   spring: {
//     stiffness: 300,
//     damping: 50,
//   },
//   navDot: {
//     stiffness: 500,
//     damping: 30,
//   },
// };

// const SCROLL_THRESHOLD = 0;

// // Main Navbar Container
// export const Navbar: React.FC<NavbarProps> = ({ children, className }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollY } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   }) as { scrollY: MotionValue<number> };
//   const pathname = usePathname();

//   const [visible, setVisible] = useState<boolean>(false);

//   useMotionValueEvent(scrollY, "change", (latest: number) => {
//     setVisible(latest > SCROLL_THRESHOLD);
//   });

//   const animationProps = useMemo(
//     () => ({
//       animate: {
//         backdropFilter: visible ? NAVBAR_ANIMATIONS.backdrop.blur : "none",
//         backgroundColor: visible ? "rgba(255,255,255,0.5)" : "transparent",
//         color:
//           pathname === "/about" ? (visible ? "var(--foreground)" : "#fff") : "var(--foreground)",
//         boxShadow: visible ? NAVBAR_ANIMATIONS.backdrop.shadow : "none",
//       },
//       transition: {
//         type: "spring" as const,
//         ...NAVBAR_ANIMATIONS.spring,
//       },
//     }),
//     [visible, pathname],
//   );

//   return (
//     <motion.header
//       {...animationProps}
//       ref={ref}
//       className={cn("fixed top-0 z-30 w-full", className)}
//     >
//       {React.Children.map(children, (child) =>
//         React.isValidElement(child)
//           ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
//           : child,
//       )}
//     </motion.header>
//   );
// };

// // Navigation Body
// export const NavBody: React.FC<NavBodyProps> = ({ children, className }) => {
//   return (
//     <nav className={cn("border-grid flex h-16 border-b lg:border-none", className)}>
//       <div className="nav-body">{children}</div>
//     </nav>
//   );
// };

// // Desktop Navigation Items
// export const NavItems: React.FC<NavItemsProps> = ({ items, className }) => {
//   const [hovered, setHovered] = useState<number | null>(null);

//   const handleMouseLeave = useCallback(() => setHovered(null), []);

//   return (
//     <motion.ul
//       onMouseLeave={handleMouseLeave}
//       className={cn("hidden space-x-8 md:flex", className)}
//     >
//       {items.map((item, idx) => (
//         <NavItem
//           key={`nav-item-${item.url}-${idx}`}
//           item={item}
//           index={idx}
//           isHovered={hovered === idx}
//           onHover={() => setHovered(idx)}
//           onLeave={() => setHovered(null)}
//         />
//       ))}
//     </motion.ul>
//   );
// };

// // Individual Navigation Item
// const NavItem: React.FC<NavItemComponentProps> = React.memo(
//   ({ item, isHovered, onHover, onLeave }) => {
//     // Get current path
//     const pathname = usePathname();
//     const isActive = pathname === item.url;

//     return (
//       <li className="relative" onMouseEnter={onHover} onMouseLeave={onLeave}>
//         <Link
//           className={cn(
//             "group relative flex items-center text-sm font-medium select-none",
//             isActive && "text-brand-main",
//           )}
//           href={item.url}
//           aria-label={item.title}
//         >
//           <span className="relative mr-1 inline-block h-4 w-4">
//             {(isHovered || isActive) && (
//               <span
//                 className={cn(
//                   "absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
//                   isActive ? "bg-brand-main" : "bg-muted-foreground",
//                 )}
//                 style={{ pointerEvents: "none" }}
//               />
//             )}
//           </span>
//           <span>{item.title}</span>
//         </Link>
//       </li>
//     );
//   },
// );

// NavItem.displayName = "NavItem";

// // Mobile Navigation Toggle
// export const MobileNavToggle: React.FC<NavItemsProps> = ({ items, className }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpenChange = useCallback((open: boolean) => {
//     setIsOpen(open);
//   }, []);

//   const handleClose = useCallback(() => {
//     setIsOpen(false);
//   }, []);

//   return (
//     <Sheet open={isOpen} onOpenChange={handleOpenChange}>
//       <SheetTrigger asChild>
//         <Button
//           variant="link"
//           size="icon"
//           className="mr-2 p-0 md:hidden"
//           aria-label="Open navigation menu"
//         >
//           <MenuLeft />
//           <span className="sr-only">Open menu</span>
//         </Button>
//       </SheetTrigger>

//       <SheetContent side="left" className={cn(className, "gap-2 [&>button]:hidden")}>
//         <SheetHeader className="items-start">
//           <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
//           <NavbarLogo />
//         </SheetHeader>

//         <ScrollArea className="flex-1 px-4 pb-6">
//           <nav className="flex flex-col gap-6">
//             {items.map((item) => (
//               <MobileNavItem key={`mobile-nav-${item.url}`} item={item} onItemClick={handleClose} />
//             ))}
//           </nav>
//         </ScrollArea>

//         <MobileNavFooter onClose={handleClose} />
//       </SheetContent>
//     </Sheet>
//   );
// };

// // Mobile Navigation Item
// const MobileNavItem: React.FC<MobileNavItemProps> = React.memo(({ item, onItemClick }) => {
//   const pathname = usePathname();
//   const isActive = pathname === item.url;

//   return (
//     <Link
//       href={item.url}
//       className={cn(
//         "flex items-center font-medium",
//         isActive ? "text-brand-main" : "text-secondary-foreground",
//       )}
//       onClick={onItemClick}
//     >
//       <div className="flex items-start gap-4">
//         {item.icon && (
//           <div className={cn("shrink-0", isActive && "text-brand-main")}>{item.icon}</div>
//         )}
//         <p>{item.title}</p>
//       </div>
//       {item.items && <ArrowRight size={24} className="ml-auto" />}
//     </Link>
//   );
// });

// MobileNavItem.displayName = "MobileNavItem";

// // Mobile Navigation Footer
// const MobileNavFooter: React.FC<MobileNavFooterProps> = ({ onClose }) => {
//   const tCommon = useTranslations("common");

//   return (
//     <SheetFooter className="flex flex-row gap-2 px-4 pt-2 pb-6">
//       <Button variant="outline" className="flex-1" asChild>
//         <Link href="/auth/sign-in" className="w-full" onClick={onClose}>
//           {tCommon("signIn")}
//         </Link>
//       </Button>
//       <Button className="flex-1" asChild>
//         <Link href="/auth/sign-up" className="w-full" onClick={onClose}>
//           {tCommon("launchProject")}
//         </Link>
//       </Button>
//     </SheetFooter>
//   );
// };

// // Navbar Logo
// export const NavbarLogo: React.FC<NavbarLogoProps> = React.memo(
//   ({ size = 64, className, isFooter }) => {
//     const subTitleColor = isFooter ? "text-gray-400" : "currentColor";

//     return (
//       <Link
//         href="/"
//         className={cn("flex flex-shrink-0 items-center", className)}
//         aria-label="Go to homepage"
//       >
//         <Image
//           src={"/assets/images/iut-logo.png"}
//           alt="IUT Douala Logo"
//           width={size}
//           height={size}
//           className="object-contain text-xs"
//         />
//         <div>
//           <h4 className="text-brand-main text-lg font-bold">IUT Douala</h4>
//           <p className={cn("-mt-1 text-xs", subTitleColor)}>Plateforme de Crowdfunding</p>
//         </div>
//       </Link>
//     );
//   },
// );

// NavbarLogo.displayName = "NavbarLogo";

// // Search Bar Component
// export const SearchBar: React.FC<SearchBarProps> = ({
//   className,
//   options = [],
//   tabs = [],
//   translations = {
//     filter: "Filter",
//     searchPlaceholder: "Search Behance...",
//     tabSelect: "Tab Select",
//     sortBy: "Sort By",
//   },
// }) => {
//   const [tab, setTab] = useState(tabs[0]?.value ?? "");
//   const [sort, setSort] = useState<string>(options[0] ?? "");
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = useCallback(
//     (e: React.FormEvent) => {
//       e.preventDefault();
//       // Handle search logic here
//       console.log("Search:", { query: searchQuery, tab, sort });
//     },
//     [searchQuery, tab, sort],
//   );

//   const handleSearchQueryChange = useCallback((value: string) => {
//     setSearchQuery(value);
//   }, []);

//   const handleTabChange = useCallback((newTab: string) => {
//     setTab(newTab);
//   }, []);

//   const handleSortChange = useCallback((newSort: string) => {
//     setSort(newSort);
//   }, []);

//   return (
//     <div className={cn("flex h-20 text-sm", className)}>
//       <div className="nav-body">
//         {/* Filter Button */}
//         <FilterButton filterText={translations.filter} />

//         {/* Search Input Container */}
//         <form onSubmit={handleSearch} className="flex-1">
//           <div className="border-input flex h-10 flex-1 items-center rounded-full border bg-gray-50 px-4 py-2">
//             <SearchInput
//               value={searchQuery}
//               onChange={handleSearchQueryChange}
//               placeholder={translations.searchPlaceholder}
//             />

//             <SearchTabs
//               tabs={tabs}
//               currentTab={tab}
//               onTabChange={handleTabChange}
//               translations={{ tabSelect: translations.tabSelect }}
//             />
//           </div>
//         </form>

//         {/* Sort Dropdown */}
//         <SortDropdown
//           options={options}
//           value={sort}
//           onChange={handleSortChange}
//           sortByText={translations.sortBy}
//         />
//       </div>
//     </div>
//   );
// };

// // Filter Button Component
// const FilterButton: React.FC<FilterButtonProps> = ({ filterText }) => (
//   <button
//     type="button"
//     className={cn(
//       "base-button",
//       "text-secondary-foreground hover:text-foreground min-w-0",
//       "sm:hover:bg-accent sm:hover:text-accent-foreground sm:dark:bg-input/30 sm:dark:border-input sm:dark:hover:bg-input/50 sm:min-w-16 sm:border sm:bg-transparent sm:px-3 sm:py-1.5 sm:leading-6 sm:has-[>svg]:px-3",
//     )}
//     aria-label={filterText}
//   >
//     <FilterSearch />
//     <span className="hidden md:inline-flex">{filterText}</span>
//   </button>
// );

// // Search Input Component
// const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => (
//   <div className="flex flex-1 items-center">
//     <Search className="mr-2" />
//     <input
//       type="text"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className="placeholder:text-muted-foreground min-w-0 flex-1 border-none bg-transparent font-medium outline-none"
//       aria-label="Search input"
//     />
//   </div>
// );

// // Search Tabs Component
// const SearchTabs: React.FC<SearchTabsProps> = ({ tabs, currentTab, onTabChange, translations }) => {
//   if (tabs.length === 0) return null;

//   return (
//     <div className="ml-4 flex items-center gap-1 md:ml-6">
//       {/* Mobile: Select */}
//       <div className="md:hidden">
//         <Select value={currentTab} onValueChange={onTabChange}>
//           <SelectTrigger
//             className={cn(
//               "flex min-w-0 items-center gap-1 rounded-full border-none bg-transparent",
//               "sm:px-3 sm:py-1.5",
//             )}
//             aria-label={translations.tabSelect}
//           >
//             <span className="hidden sm:inline-flex">
//               {tabs.find((t) => t.value === currentTab)?.label}
//             </span>
//           </SelectTrigger>
//           <SelectContent align="start">
//             {tabs.map((t) => (
//               <SelectItem
//                 key={t.value}
//                 value={t.value}
//                 className={cn(
//                   "[&_svg]:text-brand-main",
//                   currentTab === t.value &&
//                     "!text-brand-main focus:bg-brand-main/5 focus:text-brand-main hover:bg-brand-main/5",
//                 )}
//               >
//                 {t.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Desktop: Tabs */}
//       <div className="hidden md:flex md:items-center md:gap-1">
//         {tabs.map((t) => (
//           <Button
//             key={t.value}
//             type="button"
//             variant={currentTab === t.value ? "secondary" : "ghost"}
//             className={cn(
//               "rounded-full py-1 shadow-xs",
//               currentTab === t.value
//                 ? "text-foreground bg-white"
//                 : "hover:text-secondary-foreground bg-transparent",
//             )}
//             onClick={() => onTabChange(t.value)}
//           >
//             {t.label}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Sort Dropdown Component
// const SortDropdown: React.FC<SortDropdownProps> = ({ options, value, onChange, sortByText }) => {
//   if (options.length === 0) return null;

//   return (
//     <Select value={value} onValueChange={onChange}>
//       <SelectTrigger
//         className={cn("group hidden min-w-0 border-none bg-transparent px-0 sm:inline-flex")}
//         aria-label={sortByText}
//       >
//         <Sort className="text-secondary-foreground group-hover:text-foreground" />
//         <div className="hidden md:inline-block">
//           <SelectValue />
//         </div>
//       </SelectTrigger>
//       <SelectContent className="min-w-40">
//         {options.map((option) => (
//           <SelectItem
//             key={option}
//             value={option}
//             className={cn(
//               "[&_svg]:text-brand-main",
//               option === value &&
//                 "text-brand-main focus:bg-brand-main/5 focus:text-brand-main hover:bg-brand-main/5",
//             )}
//           >
//             {option}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// };
