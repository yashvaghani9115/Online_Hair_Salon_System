import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
const OwnerSidebar = () => {
  const shop_name = JSON.parse(localStorage.getItem("shop")).shop_name
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            {shop_name} Management
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/ownerHome" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/barbermanagement" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Employee Management</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/ownerservice" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Hair Style Management</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Manage Your Data
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};
export default OwnerSidebar;