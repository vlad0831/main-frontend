import { createContext } from 'react';

interface Portfolio {
  selectedValues: Set<string>;
  selectedSectors: Set<string>;
  onValueChange: (value: string) => unknown;
  onSectorChange: (sector: string) => unknown;
}

const PortfolioContext = createContext<Portfolio>({
  selectedValues: new Set(),
  selectedSectors: new Set(),
  onValueChange: () => {},
  onSectorChange: () => {},
});

export default PortfolioContext;
