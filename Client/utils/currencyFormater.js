function currencyFormater (num) {
    return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(num);
}

export default currencyFormater;