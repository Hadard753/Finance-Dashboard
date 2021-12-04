import * as React from 'react';
import { FunctionComponent } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

interface HeaderProps {
    brandName?: string,
    bg?: string,
    variant?: "light" | "dark",
    links?: {
        href: string,
        label: string
    }[]
}

const Header: FunctionComponent<HeaderProps> = (props) => {
    return <Navbar bg={props.bg || "light"} variant={props.variant || "light"}>
        <Container>
            <Navbar.Brand href="#home">{props.brandName}</Navbar.Brand>
            <Nav className="me-auto">
                {props.links?.map(({label, href}) => <Nav.Link key={label} data-cy={`header_link_${label}`} href={href}>Home</Nav.Link>)}
            </Nav>
        </Container>
    </Navbar>;
}

export default Header;