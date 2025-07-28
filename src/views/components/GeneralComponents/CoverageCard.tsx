import { Card, ListGroup } from "react-bootstrap";
import {
  CheckSquareFill,
  XCircleFill,
  InfoCircle,
} from "react-bootstrap-icons";
import GrayButton from "./Button.tsx";

interface CoberturaCardProps {
  titulo: string;
  precio: string;
  itemsApply?: aplica[];
  onContratar: () => void;
}

interface aplica {
  name?: string;
  apply?: boolean;
  description?: string;
}
const generateAlert = (details: string) => {
  alert(details);
};

const CoverageCard = ({
  titulo,
  precio,
  itemsApply,
  onContratar,
}: CoberturaCardProps) => {
  return (
    <Card className="text-center h-100 card border-dark mb-3">
      <Card.Header className="card text-white bg-secondary mb-3">
        <strong>{titulo}</strong>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="display-6">{precio}</Card.Title>
        <ListGroup variant="flush" className="mb-3">
          {itemsApply?.map((itemApply, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <InfoCircle
                  className="me-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => generateAlert(itemApply.description || "")}
                />
                <span style={{ fontSize: "0.9rem" }}>{itemApply.name}</span>
              </div>
              {itemApply.apply ? (
                <CheckSquareFill size={24} color="grey" />
              ) : (
                <XCircleFill size={24} color="grey" />
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Botón siempre al pie */}
        <div className="mt-auto">
          <GrayButton text="Contratar" onClick={onContratar} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CoverageCard;
