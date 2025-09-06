interface tableContent {
  titles: string[];
  tableBody: tableBodys[];
  showButtom: boolean;
  customIcons?: iconsAction[];
}

// TODO: EN EL FUTURO IMPLEMENTAR ESTO?
interface iconsAction {
  customIcons?: Icon;
  onAction?: (value: any) => void;
}

interface tableBodys {
  key: number;
  rowContent: string[];
    value?: any
}
