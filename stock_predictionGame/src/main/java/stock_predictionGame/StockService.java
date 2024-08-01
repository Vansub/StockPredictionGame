package stock_predictionGame;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockService {
    private final RestTemplate restTemplate;
    private final String flaskApiUrl = "http://localhost:5000/stock/";

    @Autowired
    private StockDataRepository stockDataRepository;

    public StockService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Transactional
    public StockData fetchStockData(String symbol) {
        try {
            ResponseEntity<StockData> response = restTemplate.getForEntity(flaskApiUrl + symbol, StockData.class);
            StockData stockData = response.getBody();
            if (stockData != null) {
                saveStockData(stockData);
            }
            return stockData;
        } catch (Exception e) {
            throw new RuntimeException("Error fetching stock data: " + e.getMessage(), e);
        }
    }

    @Transactional
    private void saveStockData(StockData stockData) {
        List<StockDataEntity> entitiesToSave = new ArrayList<>();
        for (int i = 0; i < stockData.getDates().size(); i++) {
            String date = stockData.getDates().get(i);
            Double price = stockData.getPrices().get(i);
            LocalDate localDate = LocalDate.parse(date);
            
            StockDataEntity existingEntity = stockDataRepository.findBySymbolAndDate(stockData.getSymbol(), localDate);
            if (existingEntity != null) {
                // Update existing entity
                existingEntity.setPrice(price);
                entitiesToSave.add(existingEntity);
            } else {
                // Create new entity
                StockDataEntity newEntity = new StockDataEntity();
                newEntity.setSymbol(stockData.getSymbol());
                newEntity.setDate(localDate);
                newEntity.setPrice(price);
                entitiesToSave.add(newEntity);
            }
        }
        stockDataRepository.saveAll(entitiesToSave);
    }

    public StockData getStockDataFromDatabase(String symbol) {
        List<StockDataEntity> entities = stockDataRepository.findBySymbolOrderByDateAsc(symbol);
        if (entities.isEmpty()) {
            return null;
        }

        StockData stockData = new StockData(symbol, null, null);
        stockData.setPrices(entities.stream().map(StockDataEntity::getPrice).collect(Collectors.toList()));
        stockData.setDates(entities.stream().map(e -> e.getDate().toString()).collect(Collectors.toList()));

        return stockData;
    }
}