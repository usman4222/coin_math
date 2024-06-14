import React from "react";
import { Navbar, Typography, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar, IconButton, Collapse } from "@material-tailwind/react";
import { CubeTransparentIcon, UserCircleIcon, CodeBracketSquareIcon, ChevronDownIcon, PowerIcon, Bars2Icon } from "@heroicons/react/24/solid";
import { Link, useLocation } from 'react-router-dom';
import { IoNewspaperOutline } from "react-icons/io5";
import { MdRoomPreferences } from "react-icons/md";
import { IoWalletSharp } from "react-icons/io5";
import { LuCoins } from "react-icons/lu";
import { MdOutlineHome } from "react-icons/md";

const profileMenuItems = [
    {
        label: "View Profile",
        icon: UserCircleIcon,
        path: '/profile'
    },
    {
        label: "Logout",
        icon: PowerIcon,
    },
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        window.location.href = '/signin';
    };

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <button className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto focus:outline-none" onClick={() => setIsMenuOpen(true)}>
                    <Avatar variant="circular" size="sm" alt="tania andrew" className="border border-gray-900 p-0.5" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" />
                    <ChevronDownIcon strokeWidth={2.5} className={`h-3 w-3 transition-transform text-white ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, path }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem 
                            key={label} 
                            onClick={isLastItem ? handleLogout : closeMenu} 
                            className={`flex items-center gap-2 rounded ${isLastItem ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-[#262626]/10' : ''}`}>
                            {React.createElement(icon, { className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`, strokeWidth: 2 })}
                            <Typography as={isLastItem ? 'div' : Link} to={path} variant="small" className="font-normal" color={isLastItem ? 'red' : 'inherit'}>
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

const navListItems = [
    {
        label: "Home",
        icon: MdOutlineHome,
        path: '/',
    },
    {
        label: "COIN Gen",
        icon: LuCoins,
        path: '/token'
    },
    {
        label: "Wallet",
        icon: IoWalletSharp,
        path: '/wallet',
    },
    {
        label: "Referrals",
        icon: MdRoomPreferences,
        path: '/ref'
    },
    {
        label: "News",
        icon: IoNewspaperOutline,
        path: '/news'
    },
];

function NavList() {
    const location = useLocation();

    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {navListItems.map(({ label, icon, path }, key) => (
                <Typography
                    key={label}
                    as={Link}
                    to={path}
                    variant="small"
                    className={`font-medium ${location.pathname === path ? 'text-white' : 'text-[#919191]'} hover:text-white`}
                >
                    <MenuItem className="flex items-center gap-2">
                        {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                        <span>{label}</span>
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}

export function ComplexNavbar() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setIsNavOpen(false));
    }, []);

    return (
        <>
            <div className=" border-b border-[#262626] flex justify-center">
                <Navbar className="no-border rounded-none w-full p-2 lg:pl-6 bg-[#171717]">
                    <div className="relative mx-auto flex items-center justify-between text-[#fff]">
                        <Typography as="a" href="/" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
                            <div className="flex gap-2 items-center">
                                <div>
                                    <img className="w-6" src="https://res.cloudinary.com/glide/image/fetch/f_auto,h_150,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-b8b74b04-83a5-46d6-a2cc-25e0559d33df.png%3Falt%3Dmedia%26token%3D633ff17b-72a8-49f5-8f96-a06e64af4679" alt="logo" />
                                </div>
                                <div>CoinMath</div>
                            </div>
                        </Typography>
                        <div className="hidden lg:block">
                            <NavList />
                        </div>
                        <div className="flex">
                            <IconButton size="sm" color="blue-gray" variant="text" onClick={toggleIsNavOpen} className="ml-auto mr-2 lg:hidden">
                                <Bars2Icon className="h-6 w-6" />
                            </IconButton>

                            <ProfileMenu />
                        </div>
                    </div>
                    <Collapse open={isNavOpen} className="overflow-scroll">
                        <NavList />
                    </Collapse>
                </Navbar>
            </div>
        </>
    );
}
