package stock_predictionGame;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class StockController {

    @Autowired
    private PredictionService predictionService;

    @Autowired
    private StockService stockService;

    @GetMapping("/stock/{symbol}")
    public ResponseEntity<?> getStockData(@PathVariable String symbol) {
        System.out.println("Received request for stock data: " + symbol);
        try {
            StockData data = stockService.fetchStockData(symbol);
            System.out.println("Fetched stock data: " + data);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            System.err.println("Error fetching stock data: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/stock/{symbol}/db")
    public ResponseEntity<?> getStockDataFromDB(@PathVariable String symbol) {
        System.out.println("Received request for stock data from DB: " + symbol);
        try {
            StockData data = stockService.getStockDataFromDatabase(symbol);
            if (data == null) {
                return ResponseEntity.notFound().build();
            }
            System.out.println("Fetched stock data from DB: " + data);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            System.err.println("Error fetching stock data from DB: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/predict")
    public ResponseEntity<?> predictStock(@RequestBody PredictionRequest request) {
        System.out.println("Received prediction request: " + request);
        try {
            PredictionResult prediction = predictionService.predict(
                request.getSymbol(),
                request.getDate(),
                request.getUserPrediction()
            );
            return ResponseEntity.ok(prediction);
        } catch (Exception e) {
            System.err.println("Error making prediction: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}