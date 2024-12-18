'use client';

import React, { useState } from 'react';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink
} from '@/components/ui/navigation-menu';
import {
    Menu,
    LayoutDashboard,
    Clock,
    User,
    TrendingUp,
    Clock1,
    Banknote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const NavLinks = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            name: 'Past Data',
            href: '/expenseshistory',
            icon: Clock,
        },
        {
            name: 'Savings',
            href: '/yoursavings',
            icon: Banknote,
        },
        {
            name: 'Profile',
            href: '/profile',
            icon: User,
        },
        {
            name: 'Logout',
            icon: Clock1,
        },

    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo or Brand */}
                <div className="flex items-center">
                    <TrendingUp className="h-6 w-6 text-primary mr-2" />
                    <span className="text-xl font-bold text-primary">SmartSpender</span>
                </div>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden md:block">
                    <NavigationMenuList>
                        {NavLinks.map((link) => (
                            <NavigationMenuItem key={link.name}>
                                <NavigationMenuLink
                                    href={link.href}
                                    className={cn(
                                        "group inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                                        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                        "disabled:pointer-events-none disabled:opacity-50"
                                    )}
                                >
                                    <link.icon className="h-5 w-5" />
                                    {link.name}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Mobile Navigation */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild className="md:hidden">
                        <Button variant="outline" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-3/4 max-w-md">
                        <div className="space-y-6 py-6">
                            {NavLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="group flex items-center justify-center gap-4 px-4 py-2 rounded-md hover:bg-accent transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <link.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                                    <span className="text-base font-medium">{link.name}</span>
                                </a>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    );
};

export default Header;
