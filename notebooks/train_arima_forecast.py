import pandas as pd
import joblib
import warnings

from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.stattools import adfuller

warnings.filterwarnings("ignore")

# Load dataset
df = pd.read_csv(
    "data/loan_timeseries.csv"
)

# Correct column name
df["month"] = pd.to_datetime(
    df["month"]
)

# Sort
df = df.sort_values("month")

# Set index
df.set_index("month", inplace=True)

# Target variable
series = df["loan_applications"]

# Stationarity test
adf_result = adfuller(series)

print("\nADF Statistic:")
print(adf_result[0])

print("\np-value:")
print(adf_result[1])

# Grid Search for best ARIMA(p,d,q)
best_aic = float("inf")
best_order = None
best_model = None

p_values = range(0, 6)
d_values = range(0, 3)
q_values = range(0, 6)

for p in p_values:
    for d in d_values:
        for q in q_values:
            try:
                model = ARIMA(
                    series,
                    order=(p, d, q)
                )

                fitted_model = model.fit()

                if fitted_model.aic < best_aic:
                    best_aic = fitted_model.aic
                    best_order = (p, d, q)
                    best_model = fitted_model

            except:
                continue

print("\nBest ARIMA Order:")
print(best_order)

print("\nBest AIC:")
print(best_aic)

# Forecast next 3 months
forecast = best_model.forecast(
    steps=3
)

print("\nNext 3 Months Forecast:")
print(forecast)

# Save optimized model
joblib.dump(
    best_model,
    "models/arima_loan_forecast.pkl"
)

print(
    "\nOptimized ARIMA model saved successfully."
)

# Train-test split for backtesting
train_size = int(len(series) * 0.8)

train = series[:train_size]
test = series[train_size:]

validation_model = ARIMA(
    train,
    order=best_order
)

validation_fit = validation_model.fit()

predictions = validation_fit.forecast(
    steps=len(test)
)

from sklearn.metrics import mean_absolute_error

mae = mean_absolute_error(
    test,
    predictions
)

print("\nBacktesting MAE:")
print(mae)