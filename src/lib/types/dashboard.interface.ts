interface stockDataProps{
    name: string;
    symbol: string;
    price: number;
}

interface StockListProps{
    setStockDetails: React.Dispatch<React.SetStateAction<stockDataProps | null>>;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;

}