import React from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import SidebarItem from './SidebarItem';

const StyledSideDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-top: 10%;
    margin-left: 10%;
    border-radius: 10px;
    width: 100%;
    background-color: #282c34;
    height: 100%;
    
`;

const StyledMenuDiv = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
`;

const StyledLogoutDiv = styled.div`
    position: absolute;
    bottom: 15px;
    height: 10%;
    width: 10%;
    background-color: #61dafb;
    font-size: large;
    text-align: center;
`;


const Sidebar = () => {
    const menus = [
        { name: "Home", path: "/" } ,
        { name: "공지사항", path: "/notice" } ,
        { name: "전자결재", path: "/document" } ,
        { name: "조직도", path: "/organ" } ,
    ]
    return (
        <StyledSideDiv>
            <StyledMenuDiv>
                {
                    menus.map( (menu, index) => {
                        return (
                            <NavLink
                                style={ {color:"gray"} }
                                to={menu.path}
                                key={index}
                            >
                                <SidebarItem
                                    menu={menu}
                                />
                            </NavLink>
                        )
                    })
                }
                <StyledLogoutDiv>
                    LOGOUT
                </StyledLogoutDiv>
            </StyledMenuDiv>
        </StyledSideDiv>
    );
};

export default Sidebar;