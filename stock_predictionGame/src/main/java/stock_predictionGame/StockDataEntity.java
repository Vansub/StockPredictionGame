package stock_predictionGame;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.LocalDate;
@Entity
@Table(name = "stock_data", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"symbol", "date"}, name = "unique_stock_date")
})
public class StockDataEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String symbol;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Double price;

    // Constructors
    public StockDataEntity() {}

    public StockDataEntity(String symbol, LocalDate date, Double price) {
        this.symbol = symbol;
        this.date = date;
        this.price = price;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "StockDataEntity{" +
                "id=" + id +
                ", symbol='" + symbol + '\'' +
                ", date=" + date +
                ", price=" + price +
                '}';
    }
}