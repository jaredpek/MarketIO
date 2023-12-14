from math import floor

class Metric():
    def __init__(self, products, field):
        self.products = products
        self.field = field
        products.sort(key=lambda product: product[field])
    
    def lower_quartile(self):
        index = floor(len(self.products) * 0.25)
        return round(self.products[index][self.field], 2)

    def mean(self):
        total = 0
        for item in self.products:
            total += item[self.field]
        return round(total / len(self.products), 2)

    def median(self):
        index = floor(len(self.products) * 0.5)
        return round(self.products[index][self.field], 2)

    def upper_quartile(self):
        index = floor(len(self.products) * 0.75)
        return round(self.products[index][self.field], 2)

    def compute(self):
        results = {}
        for metric in ['lower_quartile', 'mean', 'median', 'upper_quartile']:
            results[metric] = 0
        if not self.products or not len(self.products):
            return results
        
        results['lower_quartile'] = self.lower_quartile()
        results['mean'] = self.mean()
        results['median'] = self.median()
        results['upper_quartile'] = self.upper_quartile()
        results['quantity_reviewed'] = len(self.products)

        return results
