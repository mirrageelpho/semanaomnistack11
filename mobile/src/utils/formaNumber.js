import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

  const formatValue = Intl.NumberFormat("pt-Br", {
    style: "currency",
    currency: "BRL"
  });

export default formatValue