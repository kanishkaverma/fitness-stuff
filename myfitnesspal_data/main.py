# %%
import myfitnesspal
import browser_cookie3
from datetime import date, timedelta
import csv
from utils import contains

# Set up MyFitnessPal client
url = "https://www.myfitnesspal.com/"
cj = browser_cookie3.edge()
client = myfitnesspal.Client(cookiejar=cj, unit_aware=False)

# Fetch data from MyFitnessPal
numDays = 300
all_foods = []
for i in range(numDays):
    today = date.today() - timedelta(days=i)
    day = client.get_date(today.year, today.month, today.day)
    meals = day.meals
    if len(meals) != 0:
        for meal in meals:
            for food in meal:
                if food:
                    # Processing food data
                    processed = [0] * 7
                    if food.short_name:
                        processed[0] = (
                            food.short_name.strip()
                            .casefold()
                            .replace(",", " ")
                            .replace('"', " ")
                        )
                    else:
                        processed[0] = (
                            food.name.strip()
                            .casefold()
                            .replace(",", " ")
                            .replace('"', " ")
                        )
                    if food.quantity and food.quantity.isnumeric():
                        processed[1] = int(food.quantity)
                    if food.unit:
                        if (
                            "gram" in food.unit
                            or "grams" in food.unit
                            or food.unit == "g"
                        ):
                            processed[2] = "grams"
                        else:
                            processed[2] = food.unit

                    processed[4] = int(food.nutrition_information["protein"])
                    processed[5] = int(food.nutrition_information["fat"])
                    processed[6] = int(food.nutrition_information["calories"])
                    all_foods.append(processed)

# Save unique foods to CSV
unique_foods = []
for food in all_foods:
    if not contains(unique_foods, food):
        unique_foods.append(food)

with open("data.csv", "w") as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(
        ["name", "quantity", "unit", "carbohydrates", "protein", "fat", "calories"]
    )
    for food in unique_foods:
        writer.writerow(food)

# %%
