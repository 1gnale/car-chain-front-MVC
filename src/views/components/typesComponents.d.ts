interface tableContent {
  titles: string[];
  tableBody: tableBodys[];
  showButtom: boolean;
  customIcons?: iconsAction[];
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
