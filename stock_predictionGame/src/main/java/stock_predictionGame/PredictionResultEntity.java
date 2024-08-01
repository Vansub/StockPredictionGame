package stock_predictionGame;

import java.time.LocalDate;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "prediction_results")
public class PredictionResultEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String symbol;

    @Column(nullable = false)
    private LocalDate predictionDate;

    @Column(nullable = false)
    private double userPrediction;

    @Column(nullable = false)
    private double modelPrediction;

    private int score;

    // Constructors
    public PredictionResultEntity() {}

    public PredictionResultEntity(String symbol, LocalDate predictionDate, double userPrediction, double modelPrediction, int score) {
        this.symbol = symbol;
        this.predictionDate = predictionDate;
        this.userPrediction = userPrediction;
        this.modelPrediction = modelPrediction;
        this.score = score;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public LocalDate getPredictionDate() {
        return predictionDate;
    }

    public void setPredictionDate(LocalDate predictionDate) {
        this.predictionDate = predictionDate;
    }

    public double getUserPrediction() {
        return userPrediction;
    }

    public void setUserPrediction(double userPrediction) {
        this.userPrediction = userPrediction;
    }

    public double getModelPrediction() {
        return modelPrediction;
    }

    public void setModelPrediction(double modelPrediction) {
        this.modelPrediction = modelPrediction;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    @Override
    public String toString() {
        return "PredictionResultEntity{" +
                "id=" + id +
                ", symbol='" + symbol + '\'' +
                ", predictionDate=" + predictionDate +
                ", userPrediction=" + userPrediction +
                ", modelPrediction=" + modelPrediction +
                ", score=" + score +
                '}';
    }
}