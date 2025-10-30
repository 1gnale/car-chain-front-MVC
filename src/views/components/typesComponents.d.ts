type ModalType = "success" | "error" | "warning" | "info";
type ViewName =
  | "PolicyProfile"
  | "pagarPolizaPorPrimeraVez"
  | "pagarPoliza"
  | "historialPoliza"
  | "historialPago"
  | "ReportAccident"
  | "PolicyBlockchain";

interface tableContent {
  titles: string[];
  tableBody: tableBodys[];
  showButtom: boolean;
  customIcons?: iconsAction[];
}
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

interface iconsAction {
  customIcons?: Icon;
  alternateIcon?: Icon; // Ícono al hacer click (opcional)
  onAction?: (value: any) => void;
  isActive?: (value: any) => boolean;
}

interface tableBodys {
  key: number;
  rowContent: string[];
  value?: any;
}

interface InfoLabel {
  title?: string;
  text?: string | undefined;
}
