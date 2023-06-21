import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

type NavigationProps = {
  isToDoList: boolean;
  handleToDoListClick: () => void;
};

export default function Navigation({ isToDoList, handleToDoListClick }: NavigationProps) {
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    if (isToDoList) {
      handleToDoListClick();
    }
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">My To Do List</Navbar.Brand>
          <Nav className="me-auto">
            {isToDoList ? (
              <>
                <Nav.Link href="/" onClick={handleNavClick}>
                  To-Do-List
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/">To-Do-List</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
