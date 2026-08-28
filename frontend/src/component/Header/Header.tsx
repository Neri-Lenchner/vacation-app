import {JSX, useEffect, useRef, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {Unsubscribe} from 'redux';
import {AuthActionType, authStore} from '../../state/auth-state';
import './Header.css';
import {User} from '../../models/user.model';
import { AiFillHome } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { RiLoginBoxFill } from "react-icons/ri";
import { FaFileCsv } from "react-icons/fa"
import { IoBarChartSharp } from "react-icons/io5";
import { MdNoteAdd } from "react-icons/md";
import { LuLayoutList } from "react-icons/lu";


function Header(): JSX.Element {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string | undefined>(authStore.getState().token
            ? (authStore.getState().user?.firstName + " " + authStore.getState().user?.lastName)
            : undefined
    );

    const [user, setUser] = useState<User | null>(authStore.getState().user);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const headerRef = useRef<HTMLDivElement | null>(null);

    useEffect((): Unsubscribe => {
        const unsubscribe: Unsubscribe = authStore.subscribe((): void => {
            const currentUser: User | null = authStore.getState().user;
            if (currentUser !== null) {
                setUserName(currentUser.firstName + " " + currentUser.lastName);
                setUser(currentUser);
            } else {
                setUserName(undefined);
                setUser(null);
            }
        });
        return (): void => unsubscribe();
    }, []);

    useEffect((): (() => void) => {
        function handleClickOutside(event: MouseEvent): void {
            if (menuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return (): void => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    function closeMenu(): void {
        setMenuOpen(false);
    }

    function logOut(): void {
        closeMenu();
        navigate('/home');
        authStore.dispatch({
            type: AuthActionType.Logout, payload: null
        });
    }

    return (
        <div className="header" ref={headerRef}>
            {userName &&
                <div className="header-headline">
                    Hello <span>{userName}</span>
                </div>
            }
            <button
                className="header-hamburger"
                onClick={(): void => setMenuOpen(open => !open)}
                aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`header-button-line-container${menuOpen ? ' header-button-line-container--open' : ''}`}>
                <div className="header-button-line">
                    <NavLink
                        to="/home"
                        className="header-button"
                        onClick={closeMenu}>
                        <AiFillHome className="header-js-icon" />
                        Home
                    </NavLink>
                    {userName
                        ? <>
                            <NavLink
                                className="header-button"
                                to="/vacations"
                                onClick={closeMenu}>
                                <LuLayoutList className="header-js-icon"/>
                                Vacations
                            </NavLink>
                            {user?.isAdmin
                                ? <>
                                    <NavLink
                                        className="header-button"
                                        to="/admin-form/add-vacation"
                                        onClick={closeMenu}>
                                        <MdNoteAdd className="header-js-icon"/>
                                        Add Vacation
                                    </NavLink>
                                    <NavLink
                                        className="header-button"
                                        to="/charts"
                                        onClick={closeMenu}>
                                        <IoBarChartSharp className="header-js-icon"/>
                                        Charts
                                    </NavLink>
                                    <NavLink
                                        className="header-button"
                                        to="/admin-page"
                                        onClick={closeMenu}>
                                        <FaFileCsv className="header-js-icon"/>
                                        CSV-Download
                                    </NavLink>
                                  </>
                                : <div></div>
                            }
                            <button
                                onClick={logOut}
                                className="header-button">
                                <RiLogoutBoxFill className="header-js-icon"/>
                                Logout
                            </button>
                        </>
                        : <NavLink
                            className="header-button"
                            to="/login-form"
                            onClick={closeMenu}>
                            <RiLoginBoxFill className="header-js-icon"/>
                            Login
                        </NavLink>
                    }
                </div>
            </div>
            <div className="header-site-name">
               TraveLentz
            </div>
            <img src="/plain-image-no-background.png" className="header-plain-image" alt="" />
            <img src="/balloon-image-no-background.png" className="header-balloon-image" alt="" />
        </div>
    );
}

export default Header;