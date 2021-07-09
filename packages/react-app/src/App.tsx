import React from "react";
import Modal from "react-modal";

import {NavBar} from "./components/nav-bar";
import {CommitBox} from "./components/commit-box";
import {ClaimBox} from "./components/claim-box";
import {OffersBox} from "./components/offers-box";

import {useStore} from "./store";

import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {CommitBoxEthToTl} from "./components/commit-box-eth-to-tl";
import {CommitBoxTlToEth} from "./components/commit-box-tl-to-eth";
import {ClaimBoxTl} from "./components/claim-box-tl";
import {ClaimBoxEth} from "./components/claim-box-eth";

Modal.setAppElement("#root");


function App() {
    // const activeNavBarSwitchItem = useStore(
    //     (state) => state.activeNavBarSwitchItem
    // );
    // const setActiveNavBarSwitchItem = useStore(
    //     (state) => state.setActiveNavBarSwitchItem
    // );
    // const setActiveCommitBoxSwitchItem = useStore(
    //     (state) => state.setActiveCommitBoxSwitchItem
    // );

    // React.useEffect(() => {
    //     const url = new URL(window.location.href);
    //
    //     if (url.pathname === "/commit") {
    //         setActiveNavBarSwitchItem("commit");
    //         setActiveCommitBoxSwitchItem("ethToTl");
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <BrowserRouter>
            <nav>
                <NavBar/>
            </nav>

            <Routes>
                <Route path="/" element={<OffersBox/>}/>

                <Route path="/offers" element={<OffersBox/>}/>
                <Route path="commit" element={<CommitBox/>}>
                    <Route path="tlToEth" element={<CommitBoxTlToEth/>}/>
                    <Route path="ethToTl" element={<CommitBoxEthToTl/>}/>
                </Route>
                <Route path="claim" element={<ClaimBox/>}>
                    <Route path="tl" element={<ClaimBoxTl/>}/>
                    <Route path="eth" element={<ClaimBoxEth/>}/>
                </Route>
                <Route path="/history" element={null}/>
            </Routes>
        </BrowserRouter>
    )
    // return (
    //   <div className="bg-gray-100 h-screen">
    //     <NavBar />
    //     {activeNavBarSwitchItem === "offers" ? <OffersBox /> : null}
    //     {activeNavBarSwitchItem === "commit" ? <CommitBox /> : null}
    //     {activeNavBarSwitchItem === "claim" ? <ClaimBox /> : null}
    //   </div>
    // );
}

export default App;
