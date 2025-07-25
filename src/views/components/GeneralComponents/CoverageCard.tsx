import { Card, ListGroup } from "react-bootstrap";
import { CheckSquareFill, XCircleFill } from "react-bootstrap-icons";
import GrayButton from "./Button.tsx";

interface CoberturaCardProps {
  titulo: string;
  precio: string;
  items: boolean[]; // true = check, false = X
  onContratar: () => void;
}

const CoverageCard = ({
  titulo,
  precio,
  items,
  onContratar,
}: CoberturaCardProps) => {
  return (
    <Card className="text-center h-100 card border-dark mb-3">
      <Card.Header className="card text-white bg-secondary mb-3">
        {titulo}
      </Card.Header>
      <Card.Body>
        <Card.Title className="display-6">${precio}</Card.Title>
        <ListGroup variant="flush">
          {items.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-center"
            >
              {item ? (
                <CheckSquareFill size={24} color="grey" />
              ) : (
                <XCircleFill size={24} color="grey" />
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <GrayButton
          text="Contratar"
          style=""
          onClick={onContratar}
        ></GrayButton>
      </Card.Body>
    </Card>
  );
};

export default CoverageCard;
