interface tableContent {
  titles: string[];
  tableBody: tableBodys[];
  showButtom: boolean;
  customIcons?: Icon[];
}

// TODO: EN EL FUTURO IMPLEMENTAR ESTO?
interface iconsAction {
  customIcons?: Icon;
  onAction: (value: string) => void;
}

interface tableBodys {
  key: number;
  rowContent: string[];
}
