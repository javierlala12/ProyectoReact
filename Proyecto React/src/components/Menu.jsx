import { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

function Menu() {
    const [openBasic, setOpenBasic] = useState(false);

    return (
        <MDBNavbar expand='lg' light bgColor= 'ligth'>
            <MDBContainer fluid>
                <Link to="/">
                    <MDBNavbarBrand style={{ color: 'red' }}>Talleres Estevez Administracion</MDBNavbarBrand>
                </Link>

                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setOpenBasic(!openBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar open={openBasic}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>

                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                                    Menu de la administracion
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <Link to="altaregistroMantenimiento"><MDBDropdownItem link>Alta de registroMantenimientos</MDBDropdownItem></Link>
                                    <Link to="graficaregistroMantenimiento"><MDBDropdownItem link>Gráfica de registroMantenimiento</MDBDropdownItem></Link>
                                    <Link to="listadoregistroMantenimiento"> <MDBDropdownItem link>Listado de registroMantenimientos</MDBDropdownItem></Link>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>


                    </MDBNavbarNav>

                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Menu;