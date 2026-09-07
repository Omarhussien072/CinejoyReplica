import { NavLink } from "react-router-dom";
import logo from '../../assets/logomark-white.svg';
import NavbarStyles from './Navbar.module.css';
import { useEffect, useState } from "react";

export default function Navbar() {
    let [pillStyle, setPillStyle] = useState({});

    useEffect(() => {
        const currentActiveTab = document.querySelector('nav [aria-current="page"]');
        if (currentActiveTab) {
            setPillStyle({
                top: currentActiveTab.offsetTop,
                left: currentActiveTab.offsetLeft,
                width: currentActiveTab.offsetWidth,
                height: currentActiveTab.offsetHeight,
            })
        }
    }, [])

    const magicPill = (e) => {
        const target = e.currentTarget;
        const isActive = target.getAttribute('aria-current') === 'page';
        const isStatic = target.getAttribute('data-static') === 'true';
        const currentActiveTab = target.parentNode.querySelector('[aria-current="page"]');
        const activeStaticTab = currentActiveTab ? currentActiveTab.getAttribute('data-static') === 'true' : false;
        const parentChildren = Array.from(target.parentNode.children);
        const activeIndex = currentActiveTab ? parentChildren.indexOf(currentActiveTab) : -1;
        const activeOnLeft = activeIndex !== -1 && parentChildren.indexOf(target) > activeIndex;

        let offsetWidth = target.offsetWidth;
        let offsetLeft = target.offsetLeft;
        
        if(!isActive && !isStatic){
            offsetWidth += 24;
        }

        if(!isActive && activeOnLeft && !activeStaticTab){
            offsetLeft -= 24;
        }

        if (e.target.id == 'home') {
            let homeTab = document.querySelector('nav [index="true"]');
            let homeWidth = !isActive ? homeTab.offsetWidth + 24 : homeTab.offsetWidth;
            let homeLeft = (!isActive && activeOnLeft) ? homeTab.offsetLeft - 24 : homeTab.offsetLeft; 
            setPillStyle({
                left: homeLeft,
                top: homeTab.offsetTop,
                width: homeWidth,
                height: homeTab.offsetHeight,
            });
            return;
        }

        setPillStyle({
            left: offsetLeft,
            top: target.offsetTop,
            width: offsetWidth,
            height: target.offsetHeight,
        })

    }

    return (
        <>
            <div className="fixed top-0 left-0 flex w-full z-50 pointer-events-none px-6 lg:px-12 py-6 justify-between items-center">
                <NavLink onClick={magicPill} to={'/'} className={`pointer-events-auto ${NavbarStyles.logo}`}>
                    <div className="flex justify-center align-center">
                        <div>
                            <img id='home' className={`w-10.5`} src={logo} alt="logo" />
                        </div>
                    </div>
                </NavLink>

                <nav className={`hidden md:flex z-50 relative glass-header items-center rounded-full pointer-events-auto gap-1 ${NavbarStyles.nav}`}>

                    <div className={`rounded-full absolute left-0 opacity-100 bg-white -z-10 ${NavbarStyles.pillIndicator} ${NavbarStyles.pillTransition}`} style={{ left: pillStyle.left, top: pillStyle.top, width: pillStyle.width, height: pillStyle.height }}></div>

                    <NavLink id='home' onClick={magicPill} index='true' className={`relative z-10 flex items-center justify-center gap-2 px-6 rounded-full text-sm font-medium whitespace-nowrap text-white/60 ${NavbarStyles.navItem}`} to="/" >
                        <span className={`text-black ${NavbarStyles.icon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-house w-4 h-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                        </span>
                        Home
                    </NavLink>

                    <NavLink onClick={magicPill} className={`relative z-10 flex items-center justify-center gap-2 px-6 rounded-full text-sm font-medium whitespace-nowrap text-white/60 ${NavbarStyles.navItem}`} to="movies" >
                        <span className={`text-black ${NavbarStyles.icon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-clapperboard w-4 h-4"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"></path><path d="m6.2 5.3 3.1 3.9"></path><path d="m12.4 3.4 3.1 4"></path><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path></svg>
                        </span>
                        Movies
                    </NavLink>

                    <NavLink onClick={magicPill} className={`relative z-10 flex items-center justify-center gap-2 px-6 rounded-full text-sm font-medium whitespace-nowrap text-white/60 ${NavbarStyles.navItem}`} to="series" >
                        <span className={`text-black ${NavbarStyles.icon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-tv w-4 h-4"><path d="m17 2-5 5-5-5"></path><rect width="20" height="15" x="2" y="7" rx="2"></rect></svg>
                        </span>
                        Shows
                    </NavLink>

                    <NavLink onClick={magicPill} className={`relative z-10 flex items-center justify-center gap-2 px-6 rounded-full text-sm font-medium whitespace-nowrap text-white/60 ${NavbarStyles.navItem}`} to="lists" >
                        <span className={`text-black ${NavbarStyles.icon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-bookmark w-4 h-4"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
                        </span>
                        My List
                    </NavLink>

                    <span className={`w-px h-4.5 m-1.5 ${NavbarStyles.divider}`}></span>

                    <NavLink onClick={magicPill} data-static='true' className={`relative z-10 w-10 h-10 flex items-center justify-center rounded text-white/60 ${NavbarStyles.searchIndicator}`} to="search">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-search w-5 h-5"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
                        </div>
                    </NavLink>

                    <NavLink onClick={magicPill} data-static='true' className={`relative z-10 w-10 h-10 cursor-pointer flex items-center justify-center rounded text-white/60 ${NavbarStyles.settingsIndicator}`} to='settings' >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-settings w-5 h-5"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </div>
                    </NavLink>
                </nav>

                <nav className={`flex md:hidden fixed left-1/2 -translate-x-1/2  bottom-5 z-50  items-center h-16 px-4 rounded-full shadow-2xl pointer-events-auto gap-1 ${NavbarStyles.phoneNav} ${NavbarStyles.nav}`}>

                    <NavLink className={`relative z-10 flex items-center justify-center rounded-full text-white/60 ${NavbarStyles.phoneNavItem}`} to="/" >
                        <span className={` text-white/60`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-house w-4 h-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                        </span>
                    </NavLink>

                    <NavLink className={`relative z-10 flex items-center justify-center rounded-full  text-white/60 ${NavbarStyles.phoneNavItem}`} to="movies" >
                        <span className={` text-white/60`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-clapperboard w-4 h-4"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"></path><path d="m6.2 5.3 3.1 3.9"></path><path d="m12.4 3.4 3.1 4"></path><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path></svg>
                        </span>
                    </NavLink>

                    <NavLink className={`relative z-10 flex items-center justify-center rounded-full text-white/60 ${NavbarStyles.phoneNavItem}`} to="series" >
                        <span className={` text-white/60`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-tv w-4 h-4"><path d="m17 2-5 5-5-5"></path><rect width="20" height="15" x="2" y="7" rx="2"></rect></svg>
                        </span>
                    </NavLink>

                    <NavLink className={`relative z-10 flex items-center justify-center  rounded-full  text-white/60 ${NavbarStyles.phoneNavItem}`} to="lists" >
                        <span className={` text-white/60`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-bookmark w-4 h-4"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
                        </span>
                    </NavLink>

                    <NavLink className={`relative z-10  flex items-center justify-center rounded text-white/60 ${NavbarStyles.phoneNavItem}`} to="search">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
                        </div>
                    </NavLink>

                    <NavLink className={`relative z-10 cursor-pointer flex items-center justify-center rounded text-white/60 ${NavbarStyles.phoneNavItem}`} to='settings' >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </div>
                    </NavLink>
                </nav>

            </div>
        </>
    );
}
