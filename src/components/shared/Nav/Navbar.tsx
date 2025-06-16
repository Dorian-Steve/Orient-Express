"use client";

import { useState, type MouseEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Type definitions
interface NavigationItem {
  name: string;
  href: string;
  external?: boolean;
}

interface NavbarProps {
  className?: string;
  brandName?: string;
  navigationItems?: NavigationItem[];
}

// Navigation configuration with proper typing
const defaultNavigation: readonly NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Orientation", href: "/Orientation" },
  { name: "Studies", href: "/services" },
  { name: "Jobs/Internships", href: "/contact" },
] as const;

// Type-safe theme selector component
const ThemeSelector: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={className}
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Type-safe navigation link component
interface NavigationLinkProps {
  item: NavigationItem;
  onClick?: () => void;
  className?: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  item,
  onClick,
  className = "",
}) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
  };

  const baseClassName =
    "hover:text-primary text-sm font-medium transition-colors";
  const combinedClassName = `${baseClassName} ${className}`.trim();

  if (item.external) {
    return (
      <a
        href={item.href}
        onClick={handleClick}
        className={combinedClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.name}
      </a>
    );
  }

  return (
    <Link href={item.href} onClick={handleClick} className={combinedClassName}>
      {item.name}
    </Link>
  );
};

// Main navbar component with proper props typing
const Navbar: React.FC<NavbarProps> = ({
  className = "",
  brandName = "Orient-Express",
  navigationItems = defaultNavigation,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuToggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleMenuClose = (): void => {
    setIsOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleMenuToggle();
    }
  };

  const headerClassName =
    `bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b-2 border-border/80 backdrop-blur ${className}`.trim();

  return (
    <header className={headerClassName}>
      <div className="container mx-auto px-0 lg:px-4">
        <nav
          className="flex h-16 items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            aria-label={`${brandName} home`}
          >
            <div
              className="bg-primary h-8 w-8 rounded-full"
              aria-hidden="true"
            />
            <span className="text-xl font-bold">{brandName}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex" role="menubar">
            {navigationItems.map((item) => (
              <NavigationLink
                key={item.name}
                item={item}
                className="hover:text-primary text-sm font-medium transition-colors"
              />
            ))}
          </div>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Selector - Desktop */}
            <div className="hidden md:block">
              <ThemeSelector />
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:block">
              <SignedOut>
                <SignInButton>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    aria-label="Sign in to your account"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                    },
                  }}
                />
              </SignedIn>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                  onClick={handleMenuToggle}
                  onKeyDown={handleKeyDown}
                >
                  {isOpen ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {isOpen ? "Close menu" : "Toggle menu"}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px]"
                id="mobile-menu"
                aria-label="Mobile navigation menu"
              >
                <div className="mt-6 flex flex-col items-center space-y-4">
                  {/* Mobile Navigation */}
                  <nav
                    role="menu"
                    aria-label="Mobile navigation"
                    className="w-full"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      {navigationItems.map((item) => (
                        <NavigationLink
                          key={item.name}
                          item={item}
                          onClick={handleMenuClose}
                          className="hover:text-primary block py-2 text-center text-lg font-medium transition-colors"
                        />
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Auth & Theme */}
                  <div className="w-full space-y-4 border-t pt-4">
                    {/* Theme Selector - Mobile */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">Theme</span>
                        <ThemeSelector />
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <SignedOut>
                        <SignInButton>
                          <Button
                            className="w-32"
                            type="button"
                            aria-label="Sign in to your account"
                          >
                            Sign In
                          </Button>
                        </SignInButton>
                      </SignedOut>
                      <SignedIn>
                        <div className="flex items-center space-x-3">
                          <UserButton
                            appearance={{
                              elements: {
                                avatarBox: "h-8 w-8",
                              },
                            }}
                          />
                          <span className="text-sm font-medium">Account</span>
                        </div>
                      </SignedIn>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

// Export with proper typing
export default Navbar;

// Export types for external use
export type { NavigationItem, NavbarProps };
