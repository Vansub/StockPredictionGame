package stock_predictionGame;

public class PredictionRequest {
    private String symbol;
    private String date;
    private double userPrediction;

    // Default constructor
    public PredictionRequest() {}

    // Constructor with all fields
    public PredictionRequest(String symbol, String date, double userPrediction) {
        this.symbol = symbol;
        this.date = date;
        this.userPrediction = userPrediction;
    }

    // Getters and setters
    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getUserPrediction() {
        return userPrediction;
    }

    public void setUserPrediction(double userPrediction) {
        this.userPrediction = userPrediction;
    }

    @Override
    public String toString() {
        return "PredictionRequest{" +
               "symbol='" + symbol + '\'' +
               ", date='" + date + '\'' +
               ", userPrediction=" + userPrediction +
               '}';
    }
}