package stock_predictionGame;

import java.util.List;

public class StockData {
    private String symbol;
    private List<Double> prices;
    private List<String> dates;
    

	private List<String> futureDates;
   
    
    public List<String> getFutureDates() {
		return futureDates;
	}

	public void setFutureDates(List<String> futureDates) {
		this.futureDates = futureDates;
	}

	

    // Constructor
    public StockData(String symbol, List<Double> prices, List<String> dates) {
        this.symbol = symbol;
        this.prices = prices;
        this.dates = dates;
        this.futureDates = futureDates;
    }

    // Getters and setters
    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public List<Double> getPrices() {
        return prices;
    }

    public void setPrices(List<Double> prices) {
        this.prices = prices;
    }

    public List<String> getDates() {
        return dates;
    }

    public void setDates(List<String> dates) {
        this.dates = dates;
    }
}