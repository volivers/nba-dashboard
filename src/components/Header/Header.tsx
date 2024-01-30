import React, { useMemo } from 'react';
import { Navbar, Container, Button, ButtonGroup, Offcanvas } from 'react-bootstrap';
import { useTeam } from '../../hooks/useTeam';
import Logo from '../Logo/Logo';

export interface HeaderProps {
  activeTeamId: number;
  onTeamChange: (id: number) => void;
}

const Header = ({ activeTeamId, onTeamChange }: HeaderProps) => {
  const { data: results, isLoading } = useTeam();

  const activeTeam = useMemo(() => results?.data.find(({ id }) => id === activeTeamId), [activeTeamId, results?.data]);

  return (
    <Navbar expand={false} className="bg-body-tertiary mb-3 p-3" bg="dark" data-bs-theme="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand><img src="img/NBA.svg" alt="nba-logo" loading="lazy" /></Navbar.Brand>
        {!isLoading && (
          <Navbar.Text as="h1" className="p-0">
            <Logo name={activeTeam?.abbreviation} />
            {activeTeam?.fullName}
          </Navbar.Text>
        )}
        <Navbar.Toggle className="border-0" />
        <Navbar.Offcanvas aria-label="offcanvasNavbarLabel" bg="dark" data-bs-theme="dark" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title as="h1">Teams</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ButtonGroup vertical>
              {results?.data?.map(({ abbreviation, fullName, id }) => (
                <Button
                  className="text-light text-start text-decoration-none"
                  disabled={activeTeamId === id}
                  onClick={() => onTeamChange(id)}
                  key={id}
                  variant="link"
                >
                  <Logo name={abbreviation} />
                  {fullName}
                </Button>
              ))}
            </ButtonGroup>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;