import React, { useState } from 'react'
import { Button, Alert, Collapse, Nav } from 'react-bootstrap'

const SystemModule = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="d-grid gap-2">

            <Button variant="outline-success" size="sm"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                System
            </Button>

            <Collapse in={open}> 
                <div id="example-collapse-text">
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link href="/home">Dictionary</Nav.Link>
                        <Nav.Link eventKey="link-1">Scripts</Nav.Link>
                        <Nav.Link eventKey="link-2">Logs</Nav.Link>
                        <Nav.Link eventKey="disabled" disabled>
                            Security
                        </Nav.Link>
                    </Nav>
                </div>
            </Collapse>

        </div>
    )
}

export default SystemModule




