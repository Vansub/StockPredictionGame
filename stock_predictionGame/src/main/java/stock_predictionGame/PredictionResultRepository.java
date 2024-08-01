package stock_predictionGame;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface PredictionResultRepository extends JpaRepository<PredictionResultEntity, Long> {
    PredictionResultEntity findBySymbolAndPredictionDate(String symbol, LocalDate predictionDate);
}