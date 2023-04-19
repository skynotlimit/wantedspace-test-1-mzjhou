import { useEffect } from "react";

type Props = {
  url: string;
  setter: (data: any) => void;
};

const DataFetcher = ({ url, setter }: Props) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setter(data);
    };

    fetchData();
  }, [url, setter]);

  return null;
};

export default DataFetcher;
